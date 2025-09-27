import { NextResponse } from 'next/server';

// Cache configuration
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
let cachedData: any = null;
let lastFetch = 0;

export async function GET() {
  try {
    const token = process.env.VERCEL_API_TOKEN;
    
    if (!token) {
      return NextResponse.json(
        { error: 'VERCEL_API_TOKEN not configured' },
        { status: 500 }
      );
    }

    // Check if we have cached data that's still fresh
    const now = Date.now();
    if (cachedData && (now - lastFetch) < CACHE_DURATION) {
      // Return cached data with appropriate headers
      return NextResponse.json(
        { projects: cachedData },
        {
          headers: {
            'Cache-Control': 'public, max-age=300, stale-while-revalidate=600', // 5 min cache, 10 min stale
            'X-Cache': 'HIT',
            'X-Cache-Timestamp': lastFetch.toString(),
          }
        }
      );
    }

    console.log('Fetching fresh data from Vercel API...');

    // Fetch projects with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    try {
      const projectsRes = await fetch("https://api.vercel.com/v9/projects", {
        headers: { Authorization: `Bearer ${token}` },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!projectsRes.ok) {
        throw new Error(`Vercel API error: ${projectsRes.status}`);
      }

      const projectsData = await projectsRes.json();
      
      // Optimized: Only fetch domains for projects that might have custom domains
      // Most projects don't have custom domains, so we can reduce API calls significantly
      const projectsWithDomains = await Promise.all(
        projectsData.projects.map(async (project: any) => {
          // Skip domain fetching for projects that are likely test/deployment projects
          if (project.name.toLowerCase().includes('test') || 
              project.name.toLowerCase().includes('deploy') ||
              project.name.toLowerCase().includes('demo')) {
            return project;
          }

          try {
            // Only fetch domains if project seems like it might have custom domains
            const domainsRes = await fetch(`https://api.vercel.com/v9/projects/${project.id}/domains`, {
              headers: { Authorization: `Bearer ${token}` },
              signal: controller.signal,
            });
            
            if (domainsRes.ok) {
              const domainsData = await domainsRes.json();
              return {
                ...project,
                customDomains: domainsData.domains || []
              };
            }
            
            return project;
          } catch (error) {
            console.error(`Error fetching domains for project ${project.name}:`, error);
            return project;
          }
        })
      );
      
      // Update cache
      cachedData = projectsWithDomains;
      lastFetch = now;
      
      return NextResponse.json(
        { projects: projectsWithDomains },
        {
          headers: {
            'Cache-Control': 'public, max-age=300, stale-while-revalidate=600',
            'X-Cache': 'MISS',
            'X-Cache-Timestamp': now.toString(),
          }
        }
      );
    } catch (fetchError) {
      clearTimeout(timeoutId);
      
      // If we have stale cached data, return it
      if (cachedData) {
        console.warn('API fetch failed, returning stale cached data:', fetchError);
        return NextResponse.json(
          { projects: cachedData },
          {
            headers: {
              'Cache-Control': 'public, max-age=300, stale-while-revalidate=600',
              'X-Cache': 'STALE',
              'X-Cache-Timestamp': lastFetch.toString(),
            }
          }
        );
      }
      
      throw fetchError;
    }
  } catch (error) {
    console.error('Error fetching Vercel projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}
