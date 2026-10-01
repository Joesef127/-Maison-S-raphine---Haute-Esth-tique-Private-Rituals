import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  Upload, 
  Send, 
  Volume2, 
  Sparkles, 
  Bot, 
  FileText, 
  Loader2, 
  CheckCircle2, 
  RefreshCw, 
  Headphones,
  Sliders,
  Play,
  Square
} from 'lucide-react';
import { ServiceItem } from '../../types';
import { SERVICES } from '../../data/services';

interface ConsultationSuiteProps {
  onSelectServiceToBook: (service: ServiceItem) => void;
  defaultTab?: 'diagnostic' | 'chat' | 'audio';
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const ConsultationSuite: React.FC<ConsultationSuiteProps> = ({
  onSelectServiceToBook,
  defaultTab = 'diagnostic'
}) => {
  const [activeTab, setActiveTab] = useState<'diagnostic' | 'chat' | 'audio'>(defaultTab);

  // --- Image Analysis State ---
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sample reference presets for quick testing if user does not upload immediately
  const samplePresets = [
    {
      label: 'Editorial Portrait',
      desc: 'Skin tone & lash mapping',
      dataUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="400" height="400" fill="%23F5EFEB"/><circle cx="200" cy="180" r="100" fill="%23E8D9CD"/><ellipse cx="170" cy="170" rx="14" ry="7" fill="%233A3029"/><ellipse cx="230" cy="170" rx="14" ry="7" fill="%233A3029"/><path d="M150 155 Q170 145 190 155" stroke="%233A3029" stroke-width="4" fill="none"/><path d="M210 155 Q230 145 250 155" stroke="%233A3029" stroke-width="4" fill="none"/><path d="M185 235 Q200 245 215 235" stroke="%23A85B55" stroke-width="4" fill="none"/></svg>'
    },
    {
      label: 'Nail Bed Reference',
      desc: 'Apex & cuticle architecture',
      dataUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="400" height="400" fill="%23FAF6F2"/><rect x="150" y="100" width="100" height="180" rx="30" fill="%23DFC8B5"/><path d="M150 140 Q200 110 250 140" fill="%23B89366"/></svg>'
    }
  ];

  // --- Chat State ---
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: 'Bonjour. I am Madame Éléonore, Senior Aesthetician and Private Concierge at Maison Séraphine. How may I guide your personal beauty ritual today? Inquire about our Japanese gel techniques, featherweight lash maps, buccal facial contouring, or personalized booking appointments.',
      timestamp: 'Just now'
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [chatComplexity, setChatComplexity] = useState<'general' | 'complex' | 'fast'>('general');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // --- Audio / TTS State ---
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [currentAudioText, setCurrentAudioText] = useState<string>(
    'Welcome to Maison Séraphine. Close your eyes and inhale deeply. Before your buccal sculpting ritual, we invite you to disconnect from the frantic rhythm of the city. Cellular renewal begins in quiet stillness.'
  );
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Handle Image Upload
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setSelectedImage(event.target?.result as string);
      setAnalysisResult(null);
      setAnalysisError(null);
    };
    reader.readAsDataURL(file);
  };

  // Perform Image Analysis using gemini-3.1-pro-preview via /api/analyze-image
  const runImageAnalysis = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setAnalysisError(null);
    setAnalysisResult(null);

    try {
      const response = await fetch('/api/analyze-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: selectedImage,
          mimeType: 'image/jpeg',
          prompt: 
            'Analyze this client photo or aesthetic reference for Maison Séraphine luxury beauty atelier. ' +
            'Provide: ' +
            '1. Harmonic Aesthetic Diagnostic (tone, texture, facial bone or nail bed balance). ' +
            '2. Bespoke Recommendations (lash curvature & length mapping, architectural brow styling, or Japanese gel palette). ' +
            '3. Matched Maison Séraphine Treatments (recommend from: Buccal Sculpting Facial, Japanese Gel Sculpting, Cashmere Featherweight Lashes, or The Grand Soirée Ritual). ' +
            '4. Pre-Appointment Guidance. ' +
            'Maintain an elegant, poised, luxury editorial tone.'
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze aesthetic reference.');
      }

      setAnalysisResult(data.analysis);
    } catch (err: any) {
      console.error(err);
      setAnalysisError(err.message || 'Unable to complete diagnostic. Please check your image or try another reference.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Send message in Chat using Gemini
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim() || isChatLoading) return;

    const userText = chatInput.trim();
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: userText,
      timestamp: 'Now'
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const history = [...chatMessages, userMsg].map((m) => ({
        role: m.role,
        text: m.text
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: history,
          complexity: chatComplexity // 'general' | 'complex' | 'fast'
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to receive concierge response.');
      }

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: data.reply,
        timestamp: 'Just now'
      };

      setChatMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: 'Forgive me; our direct atelier link encountered a slight pause. Please try once more or reach our concierge desk directly at +44 (0)20 7946 0882.',
        timestamp: 'Notice'
      };
      setChatMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Convert text to speech using gemini-3.8-flash-tts
  const playTtsAudio = async (textToSpeak: string) => {
    if (isPlayingAudio && audioRef.current) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
      return;
    }

    setIsGeneratingAudio(true);
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: textToSpeak,
          speaker: 'Concierge',
          style: 'Poised, serene, luxury aesthetician'
        })
      });

      const data = await res.json();
      if (!res.ok || !data.audioBase64) {
        throw new Error(data.error || 'Failed to synthesize speech.');
      }

      const audioSrc = `data:audio/wav;base64,${data.audioBase64}`;
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const audio = new Audio(audioSrc);
      audioRef.current = audio;

      audio.onended = () => {
        setIsPlayingAudio(false);
      };
      audio.onerror = () => {
        setIsPlayingAudio(false);
      };

      await audio.play();
      setIsPlayingAudio(true);
    } catch (err: any) {
      console.error('Audio play error:', err);
      alert('Audio narration could not be generated at this time: ' + err.message);
    } finally {
      setIsGeneratingAudio(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Editorial Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <span className="text-xs uppercase tracking-[0.3em] text-[#987547] font-medium">
          Maison Diagnostic Suite
        </span>
        <h2 className="font-serif text-3xl md:text-5xl text-[#1E1C1A] tracking-tight">
          Aesthetic Intelligence & Ritual Concierge
        </h2>
        <p className="text-sm text-[#7A736C] font-light leading-relaxed">
          Powered by advanced biological and aesthetic understanding. Analyze your facial symmetry and skin undertone, converse with our master concierge, or listen to narrated treatment rituals.
        </p>
      </div>

      {/* Tabs / Switcher */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex p-1 bg-[#EFE9DF] border border-[#E0D7C9]">
          <button
            onClick={() => setActiveTab('diagnostic')}
            className={`flex items-center gap-2 px-5 py-2.5 text-xs font-medium uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === 'diagnostic'
                ? 'bg-[#1E1C1A] text-white shadow-sm'
                : 'text-[#5E564F] hover:text-[#1E1C1A]'
            }`}
          >
            <Camera className="w-3.5 h-3.5 text-[#B89366]" />
            <span>Image Diagnostic (gemini-3.1-pro)</span>
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center gap-2 px-5 py-2.5 text-xs font-medium uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === 'chat'
                ? 'bg-[#1E1C1A] text-white shadow-sm'
                : 'text-[#5E564F] hover:text-[#1E1C1A]'
            }`}
          >
            <Bot className="w-3.5 h-3.5 text-[#B89366]" />
            <span>Concierge Chat (Multi-Turn)</span>
          </button>

          <button
            onClick={() => setActiveTab('audio')}
            className={`flex items-center gap-2 px-5 py-2.5 text-xs font-medium uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === 'audio'
                ? 'bg-[#1E1C1A] text-white shadow-sm'
                : 'text-[#5E564F] hover:text-[#1E1C1A]'
            }`}
          >
            <Headphones className="w-3.5 h-3.5 text-[#B89366]" />
            <span>Audio Rituals (gemini-3.8-tts)</span>
          </button>
        </div>
      </div>

      {/* TAB 1: IMAGE DIAGNOSTIC */}
      {activeTab === 'diagnostic' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Upload Area */}
          <div className="lg:col-span-5 bg-white border border-[#EAE2D8] p-6 space-y-6 shadow-sm">
            <div className="space-y-1">
              <h3 className="font-serif text-2xl text-[#1E1C1A]">Upload Aesthetic Reference</h3>
              <p className="text-xs text-[#7A736C]">
                Upload a portrait selfie, nail inspiration, or eye closeup for AI understanding with model <code className="bg-[#FAF6F0] px-1 py-0.5 text-[#987547] font-mono">gemini-3.1-pro-preview</code>.
              </p>
            </div>

            {/* Hidden Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageFileChange}
              accept="image/*"
              className="hidden"
            />

            {/* Drop / Display Box */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-[#D9CEBF] hover:border-[#B89366] bg-[#FAF8F5] p-6 text-center cursor-pointer transition-colors relative min-h-[220px] flex flex-col items-center justify-center"
            >
              {selectedImage ? (
                <div className="relative w-full h-56 flex items-center justify-center overflow-hidden">
                  <img
                    src={selectedImage}
                    alt="Selected Reference"
                    referrerPolicy="no-referrer"
                    className="max-h-full max-w-full object-contain"
                  />
                  <div className="absolute bottom-2 right-2 bg-[#1E1C1A]/80 text-white text-[10px] px-2 py-1 tracking-wider uppercase">
                    Change Image
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <Upload className="w-8 h-8 text-[#987547] mx-auto opacity-80" />
                  <div className="text-xs font-medium text-[#1E1C1A]">
                    Click to select from your device
                  </div>
                  <p className="text-[11px] text-[#7A736C]">
                    High-resolution portrait or close-up JPG/PNG
                  </p>
                </div>
              )}
            </div>

            {/* Quick Sample Presets */}
            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-wider text-[#7A736C] block">
                Or select an atelier sample reference:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {samplePresets.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSelectedImage(preset.dataUrl);
                      setAnalysisResult(null);
                      setAnalysisError(null);
                    }}
                    className="p-2 text-left border border-[#EAE2D8] hover:border-[#B89366] bg-[#FAF8F5] text-xs transition-colors"
                  >
                    <div className="font-medium text-[#1E1C1A]">{preset.label}</div>
                    <div className="text-[10px] text-[#7A736C]">{preset.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={runImageAnalysis}
              disabled={!selectedImage || isAnalyzing}
              className={`w-full py-3.5 text-xs font-medium uppercase tracking-widest text-white transition-all flex items-center justify-center gap-2 ${
                !selectedImage || isAnalyzing
                  ? 'bg-[#8F8880] cursor-not-allowed'
                  : 'bg-[#1E1C1A] hover:bg-[#34302C]'
              }`}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#B89366]" />
                  <span>Consulting Creative Director...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#B89366]" />
                  <span>Execute Diagnostic with Gemini Pro</span>
                </>
              )}
            </button>
          </div>

          {/* Analysis Results Display */}
          <div className="lg:col-span-7 bg-white border border-[#EAE2D8] p-6 lg:p-8 min-h-[460px] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#EAE2D8] mb-6">
                <div>
                  <h3 className="font-serif text-2xl text-[#1E1C1A]">Aesthetic Formulation</h3>
                  <span className="text-xs text-[#7A736C]">Bespoke Diagnostic Protocol</span>
                </div>
                {analysisResult && (
                  <button
                    onClick={() => playTtsAudio(analysisResult)}
                    disabled={isGeneratingAudio}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-[#B89366] text-[#987547] hover:bg-[#FAF6F0] transition-colors"
                  >
                    {isGeneratingAudio ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : isPlayingAudio ? (
                      <Square className="w-3.5 h-3.5" />
                    ) : (
                      <Volume2 className="w-3.5 h-3.5" />
                    )}
                    <span>{isPlayingAudio ? 'Stop Voice' : 'Listen via TTS'}</span>
                  </button>
                )}
              </div>

              {isAnalyzing && (
                <div className="py-20 text-center space-y-4">
                  <Loader2 className="w-8 h-8 animate-spin text-[#B89366] mx-auto" />
                  <p className="font-serif text-lg text-[#1E1C1A]">
                    Reading facial harmonics & structural balance...
                  </p>
                  <p className="text-xs text-[#7A736C] max-w-sm mx-auto">
                    Evaluating skin undertone, epidermal moisture barrier markers, orbital eyelid aperture, and nail matrix profile.
                  </p>
                </div>
              )}

              {analysisError && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-xs">
                  {analysisError}
                </div>
              )}

              {!isAnalyzing && !analysisResult && !analysisError && (
                <div className="py-20 text-center space-y-3 text-[#7A736C]">
                  <FileText className="w-8 h-8 mx-auto opacity-40 text-[#987547]" />
                  <p className="text-sm font-light">
                    Upload an aesthetic reference photo or select a sample preset to generate an editorial beauty consultation.
                  </p>
                  <p className="text-xs text-[#987547]">
                    Includes recommended lash curvature, Japanese gel shades, and matched rituals.
                  </p>
                </div>
              )}

              {analysisResult && (
                <div className="prose prose-stone max-w-none text-xs md:text-sm text-[#38332E] leading-relaxed whitespace-pre-line font-light">
                  {analysisResult}
                </div>
              )}
            </div>

            {analysisResult && (
              <div className="pt-6 border-t border-[#EAE2D8] mt-6 flex flex-col sm:flex-row gap-3 items-center justify-between">
                <span className="text-xs text-[#7A736C]">Ready to book your diagnosed ritual?</span>
                <button
                  onClick={() => onSelectServiceToBook(SERVICES[0])}
                  className="px-5 py-2.5 bg-[#1E1C1A] hover:bg-[#34302C] text-white text-xs uppercase tracking-wider font-medium transition-colors"
                >
                  Reserve Recommended Service
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: MULTI-TURN CONCIERGE CHAT */}
      {activeTab === 'chat' && (
        <div className="bg-white border border-[#EAE2D8] shadow-sm max-w-4xl mx-auto overflow-hidden flex flex-col h-[650px]">
          {/* Chat Top Bar */}
          <div className="p-4 border-b border-[#EAE2D8] bg-[#FAF8F5] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1E1C1A] text-[#FAF8F5] font-serif flex items-center justify-center text-sm font-semibold">
                MS
              </div>
              <div>
                <h3 className="font-serif text-lg text-[#1E1C1A] leading-tight">Madame Éléonore Laurent</h3>
                <span className="text-[11px] text-[#7A736C] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                  Senior Aesthetician & Atelier Concierge
                </span>
              </div>
            </div>

            {/* Model Complexity Selector */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#7A736C]">Intelligence Tier:</span>
              <div className="inline-flex border border-[#D9D0C5] text-[11px]">
                <button
                  onClick={() => setChatComplexity('fast')}
                  className={`px-2.5 py-1 transition-colors ${
                    chatComplexity === 'fast' ? 'bg-[#1E1C1A] text-white' : 'text-[#5E564F] hover:bg-[#F2ECE3]'
                  }`}
                  title="Uses gemini-3.1-flash-lite for rapid queries"
                >
                  Flash Lite (Fast)
                </button>
                <button
                  onClick={() => setChatComplexity('general')}
                  className={`px-2.5 py-1 transition-colors ${
                    chatComplexity === 'general' ? 'bg-[#1E1C1A] text-white' : 'text-[#5E564F] hover:bg-[#F2ECE3]'
                  }`}
                  title="Uses gemini-3.5-flash for general beauty advice"
                >
                  3.5 Flash (General)
                </button>
                <button
                  onClick={() => setChatComplexity('complex')}
                  className={`px-2.5 py-1 transition-colors ${
                    chatComplexity === 'complex' ? 'bg-[#1E1C1A] text-white' : 'text-[#5E564F] hover:bg-[#F2ECE3]'
                  }`}
                  title="Uses gemini-3.1-pro-preview for deep dermatology & contraindications"
                >
                  3.1 Pro (Complex)
                </button>
              </div>
            </div>
          </div>

          {/* Chat Messages Scrollable Thread */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-[#FCFBF9]">
            {chatMessages.map((msg) => {
              const isAssistant = msg.role === 'assistant';
              return (
                <div
                  key={msg.id}
                  className={`flex ${isAssistant ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] p-4 text-xs md:text-sm leading-relaxed ${
                      isAssistant
                        ? 'bg-white border border-[#EAE2D8] text-[#1E1C1A]'
                        : 'bg-[#1E1C1A] text-[#FAF8F5]'
                    }`}
                  >
                    <div className="whitespace-pre-line">{msg.text}</div>
                    <div
                      className={`mt-2 pt-2 border-t flex items-center justify-between text-[10px] ${
                        isAssistant
                          ? 'border-[#F2EBE1] text-[#9E958C]'
                          : 'border-white/10 text-white/60'
                      }`}
                    >
                      <span>{msg.timestamp}</span>
                      {isAssistant && (
                        <button
                          onClick={() => playTtsAudio(msg.text)}
                          className="hover:text-[#1E1C1A] flex items-center gap-1 transition-colors"
                        >
                          <Volume2 className="w-3 h-3 text-[#B89366]" />
                          <span>Hear voice</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {isChatLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-[#EAE2D8] p-4 text-xs text-[#7A736C] flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#B89366]" />
                  <span>Madame Éléonore is composing a tailored recommendation...</span>
                </div>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Quick Consultation Starters */}
          <div className="p-2 px-4 bg-[#FAF8F5] border-t border-[#EAE2D8] flex items-center gap-2 overflow-x-auto text-[11px] whitespace-nowrap">
            <span className="text-[#7A736C]">Inquire:</span>
            {[
              'Explain the Buccal Sculpting benefits',
              'What nail shape suits short nail beds?',
              'Are cashmere lash extensions damage-free?',
              'Recommend a treatment for sensitive dry skin'
            ].map((prompt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setChatInput(prompt);
                }}
                className="px-2.5 py-1 bg-white border border-[#D9CEBF] hover:border-[#1E1C1A] text-[#524B45] transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Message Input Box */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-[#EAE2D8] bg-white flex gap-3">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask Madame Laurent about skin rituals, nail architecture, or lash care..."
              className="flex-1 px-4 py-3 bg-[#FAF8F5] border border-[#D9CEBF] text-sm text-[#1E1C1A] placeholder-[#8F8880] focus:outline-none focus:border-[#B89366]"
            />
            <button
              type="submit"
              disabled={isChatLoading || !chatInput.trim()}
              className="px-6 py-3 bg-[#1E1C1A] hover:bg-[#34302C] text-white text-xs uppercase tracking-wider font-medium disabled:opacity-50 transition-colors flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5 text-[#B89366]" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>
        </div>
      )}

      {/* TAB 3: SERENE AUDIO RITUAL GUIDES (TTS) */}
      {activeTab === 'audio' && (
        <div className="bg-white border border-[#EAE2D8] p-8 max-w-4xl mx-auto shadow-sm space-y-8">
          <div className="space-y-2 border-b border-[#EAE2D8] pb-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#987547] font-medium">
              <Headphones className="w-4 h-4" />
              <span>Voice Narration via gemini-3.8-flash-tts</span>
            </div>
            <h3 className="font-serif text-3xl text-[#1E1C1A]">Sanctuary Audio Ritual Guides</h3>
            <p className="text-xs text-[#7A736C] max-w-xl font-light">
              Experience serene audio guides read by our poised atelier voice persona. Select a curated pre-treatment preparation ritual or enter your own text to synthesize.
            </p>
          </div>

          {/* Curated Audio Presets */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: 'Buccal Pre-Ritual Meditation',
                category: 'Skincare Prep',
                text: 'Welcome to your Buccal Sculpting facial. Prior to arriving at our Mayfair suite, ensure you have enjoyed a warm cup of water and released any clenching in your jaw. Our artisans will gently palpate the facial muscles to drain stagnant lymph fluid. Prepare to surrender to pure quiet.'
              },
              {
                title: 'Lash Architecture Aftercare',
                category: 'Lash Longevity',
                text: 'Congratulations on your new Cashmere Featherweight set. For the first twenty-four hours, avoid hot steam, showers, and saunas to allow the nano-mist bonding agent to crystallize. Brush your lashes once in the morning using your Maison Séraphine gold-tipped spoolie.'
              },
              {
                title: 'Japanese Gel Apex Protocol',
                category: 'Nail Health',
                text: 'Your nails have received non-toxic Japanese builder gel structured along your natural anatomical apex. This cantilevered curve distributes pressure away from your free edge. Apply our organic camellia nectar to the proximal fold every evening before rest.'
              }
            ].map((guide, idx) => (
              <div
                key={idx}
                className="p-5 border border-[#EAE2D8] bg-[#FAF8F5] space-y-3 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#987547] font-medium block">
                    {guide.category}
                  </span>
                  <h4 className="font-serif text-lg text-[#1E1C1A]">{guide.title}</h4>
                  <p className="text-xs text-[#7A736C] line-clamp-3 mt-1 font-light">
                    {guide.text}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setCurrentAudioText(guide.text);
                    playTtsAudio(guide.text);
                  }}
                  className="w-full py-2 bg-white border border-[#D9CEBF] hover:border-[#1E1C1A] text-xs font-medium text-[#1E1C1A] flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Play className="w-3 h-3 text-[#B89366]" />
                  <span>Listen to Guide</span>
                </button>
              </div>
            ))}
          </div>

          {/* Interactive Player Box */}
          <div className="p-6 bg-[#FAF6F0] border border-[#E0D7C9] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-[#7A736C]">Custom Audio Script Reader</span>
              {isGeneratingAudio && (
                <span className="text-xs text-[#987547] flex items-center gap-1.5">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Generating audio with gemini-3.8-flash-tts...
                </span>
              )}
            </div>

            <textarea
              rows={4}
              value={currentAudioText}
              onChange={(e) => setCurrentAudioText(e.target.value)}
              className="w-full p-3 bg-white border border-[#D9CEBF] text-xs text-[#1E1C1A] focus:outline-none focus:border-[#B89366]"
              placeholder="Type any beauty consultation text or preparation instructions here to synthesize into luxury speech..."
            />

            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#7A736C]">
                Voice: <strong className="text-[#1E1C1A]">Kore</strong> · Style: Poised luxury aesthetician
              </span>
              <button
                onClick={() => playTtsAudio(currentAudioText)}
                disabled={isGeneratingAudio || !currentAudioText.trim()}
                className="px-6 py-2.5 bg-[#1E1C1A] hover:bg-[#34302C] text-white text-xs uppercase tracking-wider font-medium flex items-center gap-2 transition-colors disabled:opacity-50"
              >
                {isPlayingAudio ? (
                  <>
                    <Square className="w-3.5 h-3.5" />
                    <span>Stop Audio</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-[#B89366]" />
                    <span>Synthesize & Play Voice</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
