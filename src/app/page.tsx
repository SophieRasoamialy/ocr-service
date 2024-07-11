"use client";
import { useState, FormEvent, ChangeEvent } from "react";
import Tesseract from "tesseract.js";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

export default function Home() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [language, setLanguage] = useState<string>("eng");
  const [text, setText] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const languages = [
    { code: "afr", name: "Afrikaans" },
    { code: "amh", name: "Amharic" },
    { code: "ara", name: "Arabic" },
    { code: "asm", name: "Assamese" },
    { code: "aze", name: "Azerbaijani" },
    { code: "aze_cyrl", name: "Azerbaijani - Cyrillic" },
    { code: "bel", name: "Belarusian" },
    { code: "ben", name: "Bengali" },
    { code: "bod", name: "Tibetan" },
    { code: "bos", name: "Bosnian" },
    { code: "bul", name: "Bulgarian" },
    { code: "cat", name: "Catalan; Valencian" },
    { code: "ceb", name: "Cebuano" },
    { code: "ces", name: "Czech" },
    { code: "chi_sim", name: "Chinese - Simplified" },
    { code: "chi_tra", name: "Chinese - Traditional" },
    { code: "chr", name: "Cherokee" },
    { code: "cym", name: "Welsh" },
    { code: "dan", name: "Danish" },
    { code: "deu", name: "German" },
    { code: "dzo", name: "Dzongkha" },
    { code: "ell", name: "Greek, Modern (1453-)" },
    { code: "eng", name: "English" },
    { code: "enm", name: "English, Middle (1100-1500)" },
    { code: "epo", name: "Esperanto" },
    { code: "est", name: "Estonian" },
    { code: "eus", name: "Basque" },
    { code: "fas", name: "Persian" },
    { code: "fin", name: "Finnish" },
    { code: "fra", name: "French" },
    { code: "frk", name: "German Fraktur" },
    { code: "frm", name: "French, Middle (ca. 1400-1600)" },
    { code: "gle", name: "Irish" },
    { code: "glg", name: "Galician" },
    { code: "grc", name: "Greek, Ancient (-1453)" },
    { code: "guj", name: "Gujarati" },
    { code: "hat", name: "Haitian; Haitian Creole" },
    { code: "heb", name: "Hebrew" },
    { code: "hin", name: "Hindi" },
    { code: "hrv", name: "Croatian" },
    { code: "hun", name: "Hungarian" },
    { code: "iku", name: "Inuktitut" },
    { code: "ind", name: "Indonesian" },
    { code: "isl", name: "Icelandic" },
    { code: "ita", name: "Italian" },
    { code: "ita_old", name: "Italian - Old" },
    { code: "jav", name: "Javanese" },
    { code: "jpn", name: "Japanese" },
    { code: "kan", name: "Kannada" },
    { code: "kat", name: "Georgian" },
    { code: "kat_old", name: "Georgian - Old" },
    { code: "kaz", name: "Kazakh" },
    { code: "khm", name: "Central Khmer" },
    { code: "kir", name: "Kirghiz; Kyrgyz" },
    { code: "kor", name: "Korean" },
    { code: "kur", name: "Kurdish" },
    { code: "lao", name: "Lao" },
    { code: "lat", name: "Latin" },
    { code: "lav", name: "Latvian" },
    { code: "lit", name: "Lithuanian" },
    { code: "mal", name: "Malayalam" },
    { code: "mar", name: "Marathi" },
    { code: "mkd", name: "Macedonian" },
    { code: "mlt", name: "Maltese" },
    { code: "msa", name: "Malay" },
    { code: "mya", name: "Burmese" },
    { code: "nep", name: "Nepali" },
    { code: "nld", name: "Dutch; Flemish" },
    { code: "nor", name: "Norwegian" },
    { code: "ori", name: "Oriya" },
    { code: "pan", name: "Panjabi; Punjabi" },
    { code: "pol", name: "Polish" },
    { code: "por", name: "Portuguese" },
    { code: "pus", name: "Pushto; Pashto" },
    { code: "ron", name: "Romanian; Moldavian; Moldovan" },
    { code: "rus", name: "Russian" },
    { code: "san", name: "Sanskrit" },
    { code: "sin", name: "Sinhala; Sinhalese" },
    { code: "slk", name: "Slovak" },
    { code: "slv", name: "Slovenian" },
    { code: "spa", name: "Spanish; Castilian" },
    { code: "spa_old", name: "Spanish; Castilian - Old" },
    { code: "sqi", name: "Albanian" },
    { code: "srp", name: "Serbian" },
    { code: "srp_latn", name: "Serbian - Latin" },
    { code: "swa", name: "Swahili" },
    { code: "swe", name: "Swedish" },
    { code: "syr", name: "Syriac" },
    { code: "tam", name: "Tamil" },
    { code: "tel", name: "Telugu" },
    { code: "tgk", name: "Tajik" },
    { code: "tgl", name: "Tagalog" },
    { code: "tha", name: "Thai" },
    { code: "tir", name: "Tigrinya" },
    { code: "tur", name: "Turkish" },
    { code: "uig", name: "Uighur; Uyghur" },
    { code: "ukr", name: "Ukrainian" },
    { code: "urd", name: "Urdu" },
    { code: "uzb", name: "Uzbek" },
    { code: "uzb_cyrl", name: "Uzbek - Cyrillic" },
    { code: "vie", name: "Vietnamese" },
    { code: "yid", name: "Yiddish" },
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setText("");
    setLoading(true);

    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const dataUrl = reader.result as string;
        setImagePreview(dataUrl);
        await processImage(dataUrl);
        setLoading(false);
      };
      reader.readAsDataURL(file);
    } else if (imageUrl) {
      setImagePreview(imageUrl);
      await processImage(imageUrl);
      setLoading(false);
    } else {
      setLoading(false);
      setError("Please provide an image URL or upload a file.");
      toast({ description: "Please provide an image URL or upload a file." });
    }
  };

  const processImage = async (dataUrl: string) => {
    try {
      const { data } = await Tesseract.recognize(dataUrl, language, {
        logger: (m) => console.log(m),
      });
      setText(data.text);
    } catch (error) {
      console.error(error);
      setError("Failed to process image");
      toast({ description: "Failed to process image" }); // Toast notification
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setImageUrl("");
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text).then(
      () => toast({ description: "Text copied to clipboard" }),
      (err) => toast({ description: "Failed to copy text" })
    );
  };

  return (
    <div className="container mx-auto p-8 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Image To Text</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full"
        />
        {imagePreview && (
          <Image
            src={imagePreview}
            alt="Uploaded preview"
            width={400}
            height={300}
            className="w-full h-auto"
          />
        )}
        <Select value={language} onValueChange={(value) => setLanguage(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang.code} value={lang.code}>
                {lang.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button type="submit" className="w-full">
          Extract Text
        </Button>
      </form>
      {loading && (
        <div className="mt-4 flex justify-center">
          <div className="w-8 h-8 border-4 border-t-4 border-gray-200 rounded-full animate-spin border-t-blue-500"></div>
        </div>
      )}
      {text && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Extracted Text:</h2>
          <p className="mt-2 p-2 border rounded">{text}</p>
          <Button onClick={copyToClipboard} className="mt-2">
            Copy Text
          </Button>
        </div>
      )}
      {error && (
        <div className="mt-4 text-red-600">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
