
import { NextResponse } from 'next/server';
import { createClient } from 'pexels';

export async function POST(req) {
try {
        const { query } = await req.json();
        console.log(query);
        
        const client = createClient(process.env.PEXELS_API);
        const photoArray = await Promise.all(
            query.map(async(element) => {
                const photo = await client.photos.search({query: element, per_page: 1});
                return photo;
            })
        )
        console.log(photoArray)
        const photoURL = photoArray.map((photo) => {
            if(photo.photos.length > 0){
                return photo.photos[0].src.original;
        }
        })
        return NextResponse.json({ photo: photoURL });
    
} catch (error) {
    console.log("Error occurred:", error);
    return NextResponse.json({ error: error.message });
}
}

