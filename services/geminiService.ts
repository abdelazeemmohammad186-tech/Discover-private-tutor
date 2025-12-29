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
    ? `أنت "المدرسة الخاصة" لمنهج Discover المصري.
       أنت معلمة صبورة، لطيفة، ومحبوبة. تتحدثين باللغة العربية البسيطة المناسبة لطفل في ${grade}.
       الدرس الحالي هو: "${lessonTitle}".`
    : `You are a "Private Tutor" for the Egyptian Discover curriculum.
       You are a patient, kind, and friendly teacher. You speak in simple English suitable for a child in ${grade}.
       The current lesson is: "${lessonTitle}".`;

  switch (mode) {
    case 'custom':
      prompt = `${basePrompt}
      ${isAr 
        ? `السياق السابق (كلام المعلمة): "${contextHistory || 'لا يوجد'}"
           كلام الطالب الآن: "${userQuery}".
           المطلوب: إذا كان كلام المعلمة السابق سؤالاً، فاعتبر كلام الطالب إجابة عليه وقيمها بلطف.`
        : `Previous Context (Teacher said): "${contextHistory || 'None'}"
           Student says now: "${userQuery}".`}`;
      break;
    case 'explain':
      prompt = `${basePrompt} ${isAr ? 'اشرحي هذا الدرس بأسلوب شيق وممتع.' : 'Explain this lesson in an interesting way.'}`;
      break;
    case 'simplify':
      prompt = `${basePrompt} ${isAr ? 'أعيدي الشرح بكلمات أبسط جداً.' : 'Re-explain in much simpler words.'}`;
      break;
    case 'story':
      prompt = `${basePrompt} ${isAr ? 'احكِ قصة قصيرة توضح فكرة هذا الدرس.' : 'Tell a short story about this concept.'}`;
      break;
    case 'quiz':
      prompt = `${basePrompt} ${isAr ? 'اسألي سؤالاً واحداً بسيطاً حول هذا الدرس.' : 'Ask one simple question about this lesson.'}`;
      break;
    default:
      prompt = `${basePrompt} ${isAr ? 'اشرحي لي هذا الدرس.' : 'Explain this lesson.'}`;
  }

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: TEXT_MODEL,
      contents: prompt,
      config: {
        systemInstruction: isAr 
            ? "أنت معلمة ابتدائي مصرية ودودة. استخدمي لهجة مصرية بيضاء بسيطة."
            : "You are a friendly primary school teacher. Use simple English.",
        temperature: 0.7,
      }
    });
    return response.text || (isAr ? "عذراً يا بطل، حاول مرة أخرى." : "Sorry hero, try again.");
  } catch (error) {
    console.error("Error generating text:", error);
    return isAr ? "حدثت مشكلة في الاتصال." : "Connection issue.";
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
        ? `أنت المعلمة الخاصة. هذه صورة لواجب مدرسي قام به طالب في ${grade} حول درس "${lessonTitle}".
           من فضلك:
           1. اقرئي المكتوب في الصورة.
           2. صححيه بلطف شديد وشجعيه.
           3. إذا كانت الإجابة صحيحة، قولي كلمات مشجعة جداً (يا بطل، ممتاز، أحسنت).
           4. إذا كانت خاطئة، اشرحي الصواب ببساطة وبدون توبيخ.
           تحدثي بلهجة مصرية بيضاء لطيفة.`
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
        return response.text || (isAr ? "لم أستطع قراءة الصورة بوضوح، جرب مرة أخرى." : "I couldn't read the image clearly, try again.");
    } catch (error) {
        console.error("Error checking homework:", error);
        return isAr ? "حدث خطأ أثناء فحص الصورة." : "Error checking image.";
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