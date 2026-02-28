import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');

    if (!q) {
        return NextResponse.json({ error: 'Query parameter q is required' }, { status: 400 });
    }

    try {
        // Step 1: Search Wikipedia for the best matching article
        const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(q)}&format=json&origin=*`;
        const searchRes = await fetch(searchUrl);
        const searchData = await searchRes.json();

        const pages = searchData?.query?.search;
        if (!pages || pages.length === 0) {
            return NextResponse.json({ url: null });
        }

        // Step 2: Get the first image from the top matching Wikipedia page
        const pageTitle = pages[0].title;
        const imagesUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(pageTitle)}&prop=pageimages&pithumbsize=800&format=json&origin=*`;
        const imagesRes = await fetch(imagesUrl);
        const imagesData = await imagesRes.json();

        const pagesObj = imagesData?.query?.pages;
        const pageId = Object.keys(pagesObj)[0];
        const thumbnail = pagesObj[pageId]?.thumbnail?.source;

        if (thumbnail) {
            return NextResponse.json({ url: thumbnail });
        }

        return NextResponse.json({ url: null });
    } catch (error) {
        console.error('Error fetching image from Wikipedia:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
