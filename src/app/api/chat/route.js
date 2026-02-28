import { NextResponse } from 'next/server';
import { CohereClient } from 'cohere-ai';

const apiKey = "64wyuZ1Fvv3UdKtpZtUcgTJDOVOUFLMMhgRw6hCr";
const cohere = new CohereClient({
    token: apiKey,
});

export async function POST(req) {
    try {
        const { message } = await req.json();

        const response = await cohere.chat({
            message: message,
            preamble: "Tu es un assistant virtuel expert et chaleureux pour l'agence de voyage 'Tourisia'. Tu réponds naturellement aux questions des voyageurs, tu proposes des recommandations touristiques et tu aides les utilisateurs à planifier leurs vacances de rêve. Reste concis, clair, et garde toujours un ton professionnel et de qualité premium."
        });

        return NextResponse.json({ response: response.text });
    } catch (e) {
        console.error("Cohere Error:", e.name, e.message);

        // Return a clean error if Cohere API limits or other issues arise
        return NextResponse.json({
            response: `Désolé, l'IA Cohere est indisponible: ${e.message}`
        }, { status: 500 });
    }
}
