import { GoogleGenAI, Modality, GenerateContentResponse } from "@google/genai";

// Models
const TEXT_MODEL = 'gemini-2.5-flash';
const IMAGE_MODEL = 'gemini-2.5-flash-image';
const SPEECH_MODEL = 'gemini-2.5-flash-preview-tts';

// Global reference for stopping audio
let currentAudioSource: AudioBufferSourceNode | null = null;
let currentAudioContext: AudioContext | null = null;

/**
 * Stop any currently playing speech.
 */
export const stopSpeech = () => {
    if (currentAudioSource) {
        try {
            currentAudioSource.stop();
        } catch (e) {
            // Already stopped
        }
        currentAudioSource = null;
    }
};

/**
 * Generate a text explanation customized for a child.
 */
export const generateExplanation = async (
  grade: string,
  lessonTitle: string,
  mode: 'explain' | 'simplify' | 'quiz' | 'story' | 'custom',
  language: 'ar' | 'en',
  userQuery?: string,
  contextHistory?: string
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  let prompt = '';
  const isAr = language === 'ar';

  const basePrompt = isAr 
    ? `Ø£ÙØª "Ø§ÙÙØ¯Ø±Ø³Ø© Ø§ÙØ®Ø§ØµØ©" ÙÙÙÙØ¬ Discover Ø§ÙÙØµØ±Ù.
       Ø£ÙØª ÙØ¹ÙÙØ© ØµØ¨ÙØ±Ø©Ø ÙØ·ÙÙØ©Ø ÙÙØ­Ø¨ÙØ¨Ø©. ØªØªØ­Ø¯Ø«ÙÙ Ø¨Ø§ÙÙØºØ© Ø§ÙØ¹Ø±Ø¨ÙØ© Ø§ÙØ¨Ø³ÙØ·Ø© Ø§ÙÙÙØ§Ø³Ø¨Ø© ÙØ·ÙÙ ÙÙ ${grade}.
       Ø§ÙØ¯Ø±Ø³ Ø§ÙØ­Ø§ÙÙ ÙÙ: "${lessonTitle}".`
    : `You are a "Private Tutor" for the Egyptian Discover curriculum.
       You are a patient, kind, and friendly teacher. You speak in simple English suitable for a child in ${grade}.
       The current lesson is: "${lessonTitle}".`;

  switch (mode) {
    case 'custom':
      prompt = `${basePrompt}
      ${isAr 
        ? `Ø§ÙØ³ÙØ§Ù Ø§ÙØ³Ø§Ø¨Ù (ÙÙØ§Ù Ø§ÙÙØ¹ÙÙØ©): "${contextHistory || 'ÙØ§ ÙÙØ¬Ø¯'}"
           ÙÙØ§Ù Ø§ÙØ·Ø§ÙØ¨ Ø§ÙØ¢Ù: "${userQuery}".
           Ø§ÙÙØ·ÙÙØ¨: Ø¥Ø°Ø§ ÙØ§Ù ÙÙØ§Ù Ø§ÙÙØ¹ÙÙØ© Ø§ÙØ³Ø§Ø¨Ù Ø³Ø¤Ø§ÙØ§ÙØ ÙØ§Ø¹ØªØ¨Ø± ÙÙØ§Ù Ø§ÙØ·Ø§ÙØ¨ Ø¥Ø¬Ø§Ø¨Ø© Ø¹ÙÙÙ ÙÙÙÙÙØ§ Ø¨ÙØ·Ù.`
        : `Previous Context (Teacher said): "${contextHistory || 'None'}"
           Student says now: "${userQuery}".`}`;
      break;
    case 'explain':
      prompt = `${basePrompt} ${isAr ? 'Ø§Ø´Ø±Ø­Ù ÙØ°Ø§ Ø§ÙØ¯Ø±Ø³ Ø¨Ø£Ø³ÙÙØ¨ Ø´ÙÙ ÙÙÙØªØ¹.' : 'Explain this lesson in an interesting way.'}`;
      break;
    case 'simplify':
      prompt = `${basePrompt} ${isAr ? 'Ø£Ø¹ÙØ¯Ù Ø§ÙØ´Ø±Ø­ Ø¨ÙÙÙØ§Øª Ø£Ø¨Ø³Ø· Ø¬Ø¯Ø§Ù.' : 'Re-explain in much simpler words.'}`;
      break;
    case 'story':
      prompt = `${basePrompt} ${isAr ? 'Ø§Ø­ÙÙ ÙØµØ© ÙØµÙØ±Ø© ØªÙØ¶Ø­ ÙÙØ±Ø© ÙØ°Ø§ Ø§ÙØ¯Ø±Ø³.' : 'Tell a short story about this concept.'}`;
      break;
    case 'quiz':
      prompt = `${basePrompt} ${isAr ? 'Ø§Ø³Ø£ÙÙ Ø³Ø¤Ø§ÙØ§Ù ÙØ§Ø­Ø¯Ø§Ù Ø¨Ø³ÙØ·Ø§Ù Ø­ÙÙ ÙØ°Ø§ Ø§ÙØ¯Ø±Ø³.' : 'Ask one simple question about this lesson.'}`;
      break;
    default:
      prompt = `${basePrompt} ${isAr ? 'Ø§Ø´Ø±Ø­Ù ÙÙ ÙØ°Ø§ Ø§ÙØ¯Ø±Ø³.' : 'Explain this lesson.'}`;
  }

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: TEXT_MODEL,
      contents: prompt,
      config: {
        systemInstruction: isAr 
            ? "Ø£ÙØª ÙØ¹ÙÙØ© Ø§Ø¨ØªØ¯Ø§Ø¦Ù ÙØµØ±ÙØ© ÙØ¯ÙØ¯Ø©. Ø§Ø³ØªØ®Ø¯ÙÙ ÙÙØ¬Ø© ÙØµØ±ÙØ© Ø¨ÙØ¶Ø§Ø¡ Ø¨Ø³ÙØ·Ø©."
            : "You are a friendly primary school teacher. Use simple English.",
        temperature: 0.7,
      }
    });
    return response.text || (isAr ? "Ø¹Ø°Ø±Ø§Ù ÙØ§ Ø¨Ø·ÙØ Ø­Ø§ÙÙ ÙØ±Ø© Ø£Ø®Ø±Ù." : "Sorry hero, try again.");
  } catch (error) {
    console.error("Error generating text:", error);
    return isAr ? "Ø­Ø¯Ø«Øª ÙØ´ÙÙØ© ÙÙ Ø§ÙØ§ØªØµØ§Ù." : "Connection issue.";
  }
};

/**
 * Check Homework from Image
 */
export const checkHomework = async (
    grade: string,
    lessonTitle: string,
    imageBase64: string,
    language: 'ar' | 'en'
): Promise<string> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const isAr = language === 'ar';
    const cleanBase64 = imageBase64.split(',')[1] || imageBase64;

    const prompt = isAr
        ? `Ø£ÙØª Ø§ÙÙØ¹ÙÙØ© Ø§ÙØ®Ø§ØµØ©. ÙØ°Ù ØµÙØ±Ø© ÙÙØ§Ø¬Ø¨ ÙØ¯Ø±Ø³Ù ÙØ§Ù Ø¨Ù Ø·Ø§ÙØ¨ ÙÙ ${grade} Ø­ÙÙ Ø¯Ø±Ø³ "${lessonTitle}".
           ÙÙ ÙØ¶ÙÙ:
           1. Ø§ÙØ±Ø¦Ù Ø§ÙÙÙØªÙØ¨ ÙÙ Ø§ÙØµÙØ±Ø©.
           2. ØµØ­Ø­ÙÙ Ø¨ÙØ·Ù Ø´Ø¯ÙØ¯ ÙØ´Ø¬Ø¹ÙÙ.
           3. Ø¥Ø°Ø§ ÙØ§ÙØª Ø§ÙØ¥Ø¬Ø§Ø¨Ø© ØµØ­ÙØ­Ø©Ø ÙÙÙÙ ÙÙÙØ§Øª ÙØ´Ø¬Ø¹Ø© Ø¬Ø¯Ø§Ù (ÙØ§ Ø¨Ø·ÙØ ÙÙØªØ§Ø²Ø Ø£Ø­Ø³ÙØª).
           4. Ø¥Ø°Ø§ ÙØ§ÙØª Ø®Ø§Ø·Ø¦Ø©Ø Ø§Ø´Ø±Ø­Ù Ø§ÙØµÙØ§Ø¨ Ø¨Ø¨Ø³Ø§Ø·Ø© ÙØ¨Ø¯ÙÙ ØªÙØ¨ÙØ®.
           ØªØ­Ø¯Ø«Ù Ø¨ÙÙØ¬Ø© ÙØµØ±ÙØ© Ø¨ÙØ¶Ø§Ø¡ ÙØ·ÙÙØ©.`
        : `You are the Private Tutor. This is an image of homework for ${grade} about "${lessonTitle}".
           Please:
           1. Read the text in the image.
           2. Grade it gently and encouragingly.
           3. If correct, praise the student highly.
           4. If wrong, explain the correct answer simply and kindly.`;

    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: TEXT_MODEL,
            contents: {
                parts: [
                    { inlineData: { mimeType: 'image/jpeg', data: cleanBase64 } },
                    { text: prompt }
                ]
            }
        });
        return response.text || (isAr ? "ÙÙ Ø£Ø³ØªØ·Ø¹ ÙØ±Ø§Ø¡Ø© Ø§ÙØµÙØ±Ø© Ø¨ÙØ¶ÙØ­Ø Ø¬Ø±Ø¨ ÙØ±Ø© Ø£Ø®Ø±Ù." : "I couldn't read the image clearly, try again.");
    } catch (error) {
        console.error("Error checking homework:", error);
        return isAr ? "Ø­Ø¯Ø« Ø®Ø·Ø£ Ø£Ø«ÙØ§Ø¡ ÙØ­Øµ Ø§ÙØµÙØ±Ø©." : "Error checking image.";
    }
};

/**
 * Generate an image for visual learning.
 */
export const generateEducationalImage = async (grade: string, concept: string): Promise<string | null> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  try {
    // Modified prompt to enforce English text inside images
    const prompt = `Create a colorful, child-friendly educational illustration about: "${concept}". 
    Target Audience: Grade ${grade} students. 
    Style: Clear textbook illustration, vibrant colors, friendly and safe for kids. 
    IMPORTANT: Any text labels, titles, or written words inside the image MUST be in English ONLY. 
    DO NOT use Arabic script or characters inside the drawing. If there are labels for parts of an object, write them in simple English.`;
    
    const response = await ai.models.generateContent({
      model: IMAGE_MODEL,
      contents: { parts: [{ text: prompt }] },
      config: { imageConfig: { aspectRatio: "1:1" } }
    });
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
    }
    return null;
  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
};

/**
 * Text to Speech
 */
function decode(base64: string) {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
    return bytes;
  }
  
async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
    return buffer;
  }

export const playTextAsSpeech = async (text: string, onPlayStart?: () => void, onPlayEnd?: () => void, language: 'ar' | 'en' = 'ar'): Promise<void> => {
    // Stop previous speech if any
    stopSpeech();

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    try {
        const response = await ai.models.generateContent({
            model: SPEECH_MODEL,
            contents: [{ parts: [{ text: text }] }],
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } },
            },
        });
        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (!base64Audio) {
            onPlayEnd?.();
            return;
        }

        if (!currentAudioContext) {
            currentAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        }
        
        const audioBuffer = await decodeAudioData(decode(base64Audio), currentAudioContext, 24000, 1);
        const source = currentAudioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(currentAudioContext.destination);
        
        currentAudioSource = source;
        
        source.addEventListener('ended', () => {
            if (currentAudioSource === source) {
                currentAudioSource = null;
            }
            onPlayEnd?.();
        });

        onPlayStart?.();
        source.start();
    } catch (error) {
        console.error("TTS Error:", error);
        onPlayEnd?.();
    }
}