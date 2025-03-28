//components/language_gen
"use client";

import React, { useState, useEffect } from 'react';

const Modal = ({ isOpen, onClose, title, message }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-gray-700">{message}</p>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

const LanguageSampleGenerator = () => {
  const initialLanguages = [
    {
      name: "Arabic",
      sampleText: "هذا مثال على النص العربي",
      rtl: true
    },
    {
      name: "Japanese",
      sampleText: "これは日本語のテキスト例です",
      rtl: false
    },
    {
      name: "Chinese",
      sampleText: "这是中文的一个例子",
      rtl: false
    },
    {
      name: "Korean",
      sampleText: "이것은 한국어 텍스트의 예입니다",
      rtl: false
    },
    {
      name: "Thai",
      sampleText: "นี่คือตัวอย่างของข้อความภาษาไทย",
      rtl: false
    },
    {
      name: "Cyrillic",
      sampleText: "Это пример текста на кириллице",
      rtl: false
    },
    {
      name: "Greek",
      sampleText: "Αυτό είναι ένα παράδειγμα ελληνικού κειμένου",
      rtl: false
    },
    {
      name: "Hebrew",
      sampleText: "זוהי דוגמה לטקסט בעברית",
      rtl: true
    },
    {
      name: "Devanagari",
      sampleText: "यह देवनागरी लिपि का एक उदाहरण है",
      rtl: false
    },
    {
      name: "Bengali",
      sampleText: "এটি বাংলা লেখার একটি উদাহরণ",
      rtl: false
    },
    {
      name: "Tamil",
      sampleText: "இது தமிழ் உரையின் எடுத்துக்காட்டு",
      rtl: false
    },
    {
      name: "Malayalam",
      sampleText: "ഇത് മലയാളം ടെക്സ്റ്റിന്റെ ഒരു ഉദാഹരണമാണ്",
      rtl: false
    },
    {
      name: "Persian",
      sampleText: "این نمونه ای از متن فارسی است",
      rtl: true
    },
    {
      name: "Urdu",
      sampleText: "یہ اردو متن کی ایک مثال ہے",
      rtl: true
    },
    {
      name: "Amharic",
      sampleText: "ይህ በአማርኛ የተጻፈ ጽሑፍ ናሙና ነው",
      rtl: false
    },
    {
      name: "Georgian",
      sampleText: "ეს არის ქართული ტექსტის ნიმუში",
      rtl: false
    },
    {
      name: "Armenian",
      sampleText: "Սա հայերեն տեքստի օրինակ է",
      rtl: false
    },
    {
      name: "Khmer",
      sampleText: "នេះគឺជាឧទាហរណ៍នៃអក្សរខ្មែរ",
      rtl: false
    },
    {
      name: "Lao",
      sampleText: "ນີ້ແມ່ນຕົວຢ່າງຂອງຂໍ້ຄວາມພາສາລາວ",
      rtl: false
    },
    {
      name: "Burmese",
      sampleText: "ဤသည်မြန်မာစာ၏နမူနာဖြစ်သည်",
      rtl: false
    },
    {
      name: "Tibetan",
      sampleText: "འདི་ནི་བོད་ཡིག་གི་དཔེ་མཚོན་ཞིག་ཡིན",
      rtl: false
    },
    {
      name: "Sinhala",
      sampleText: "මෙය සිංහල පෙළ නිදසුනකි",
      rtl: false
    },
    {
      name: "Mongolian",
      sampleText: "Энэ бол монгол бичгийн жишээ юм",
      rtl: false
    },
    {
      name: "Latin",
      sampleText: "This is an example of Latin script text",
      rtl: false
    }
  ];
  // Use useEffect to handle localStorage to avoid hydration issues
const [allLanguages, setAllLanguages] = useState(initialLanguages);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  // Function to show modal
  const showModal = (title, message) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalOpen(true);
  };


  // Use useEffect for client-side operations to fetch from API
useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await fetch('/api/languages');
        const data = await response.json();
        
        // If we have stored languages, use them; otherwise use default list
        setAllLanguages(data.length > 0 ? data : initialLanguages);
      } catch (error) {
        console.error('Error fetching languages:', error);
        setAllLanguages(initialLanguages);
      }
    };
    
    fetchLanguages();
  }, []);
  
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [customText, setCustomText] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#f8f9fa');
  const [textColor, setTextColor] = useState('#1e293b');
  const [borderColor, setBorderColor] = useState('#e2e8f0');
  
  // New state for adding languages
  const [newLanguageName, setNewLanguageName] = useState('');
  const [newLanguageSample, setNewLanguageSample] = useState('');
  const [isRtl, setIsRtl] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setSelectedLanguage(lang);
    const selectedLangObj = allLanguages.find(l => l.name === lang);
    if (selectedLangObj) {
      setCustomText(selectedLangObj.sampleText);
    }
  };

  // Function to add a new language
  // Function to add a new language
const addNewLanguage = async () => {
    if (newLanguageName.trim() && newLanguageSample.trim()) {
      // Check is now handled by the API
      const newLanguage = {
        name: newLanguageName.trim(),
        sampleText: newLanguageSample.trim(),
        rtl: isRtl
      };
      
      try {
        const response = await fetch('/api/languages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newLanguage),
        });
        
        const result = await response.json();
        
        if (!response.ok) {
          showModal("Error", result.error || "Failed to add language");
          return;
        }
        
        // Update local state with the new language
        setAllLanguages([...allLanguages, newLanguage]);
        
        // Reset form
        setNewLanguageName('');
        setNewLanguageSample('');
        setIsRtl(false);
        
        // Show success message
        showModal("Language Added", `${newLanguageName.trim()} has been added to the language collection.`);
      } catch (error) {
        showModal("Error", "Failed to add language. Please try again.");
      }
    } else {
      showModal("Missing Information", "Please enter both a language name and sample text.");
    }
  };

  // Generate SVG code
  const generateSvgCode = () => {
    const selectedLangObj = allLanguages.find(l => l.name === selectedLanguage);
    const rtl = selectedLangObj?.rtl || false;
    
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200">
  <!-- Background rectangle -->
  <rect width="400" height="200" fill="${backgroundColor}" rx="10" ry="10"/>
  
  <!-- Border for visual clarity -->
  <rect x="10" y="10" width="380" height="180" fill="none" stroke="${borderColor}" stroke-width="2" rx="5" ry="5"/>
  
  <!-- Sample text ${rtl ? 'with right-to-left direction' : ''} -->
  <text x="200" y="110" font-family="Arial, sans-serif" font-size="24" fill="${textColor}" text-anchor="middle" dominant-baseline="middle" ${rtl ? 'direction="rtl" unicode-bidi="bidi-override"' : ''}>${customText}</text>
</svg>`;
  };

  // Function to download SVG
  const downloadSvg = () => {
    if (!selectedLanguage) return;
    
    const svgCode = generateSvgCode();
    const blob = new Blob([svgCode], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedLanguage.toLowerCase().replace(/\s+/g, '_')}_sample.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showModal("Download Complete", `The SVG file for ${selectedLanguage} has been downloaded.`);
  };
  
  // Function to download PNG
  const downloadPng = () => {
    if (!selectedLanguage) return;
    
    const svgCode = generateSvgCode();
    const svgBlob = new Blob([svgCode], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(svgBlob);
    
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 800;  // 2x size for better quality
      canvas.height = 400;
      
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      canvas.toBlob((blob) => {
        const pngUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = pngUrl;
        link.download = `${selectedLanguage.toLowerCase().replace(/\s+/g, '_')}_sample.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(pngUrl);
        
        showModal("Download Complete", `The PNG file for ${selectedLanguage} has been downloaded.`);
      }, 'image/png');
    };
    
    img.src = url;
  };

  const svgCode = selectedLanguage ? generateSvgCode() : '';
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Modal Component */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalTitle}
        message={modalMessage}
      />
      
      <h1 className="text-2xl font-bold mb-6">Language Sample SVG Generator</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Controls</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Select Language:</label>
            <select 
              value={selectedLanguage} 
              onChange={handleLanguageChange}
              className="w-full p-2 border rounded"
            >
              <option value="">-- Select a language --</option>
              {[...allLanguages]
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(lang => (
                  <option key={lang.name} value={lang.name}>{lang.name}</option>
                ))
              }
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Custom Text:</label>
            <textarea 
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              className="w-full p-2 border rounded"
              rows="3"
              dir={selectedLanguage && allLanguages.find(l => l.name === selectedLanguage)?.rtl ? 'rtl' : 'ltr'}
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Background:</label>
              <input 
                type="color" 
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="w-full p-1 border rounded h-10"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Text Color:</label>
              <input 
                type="color" 
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="w-full p-1 border rounded h-10"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Border:</label>
              <input 
                type="color" 
                value={borderColor}
                onChange={(e) => setBorderColor(e.target.value)}
                className="w-full p-1 border rounded h-10"
              />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Preview & Code</h2>
          
          {selectedLanguage ? (
            <>
              <div className="border rounded p-2 mb-4 bg-gray-50 flex justify-center">
                <div dangerouslySetInnerHTML={{ __html: svgCode }} />
              </div>
              
              {/* Download buttons */}
              <div className="flex space-x-2 mb-4">
                <button
                  onClick={downloadSvg}
                  className="flex-1 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Download SVG
                </button>
                <button
                  onClick={downloadPng}
                  className="flex-1 bg-pink-500 text-white p-2 rounded hover:bg-pink-600 flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Download PNG
                </button>
              </div>
              
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">SVG Code:</label>
                <div className="relative">
                  <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto whitespace-pre-wrap">
                    {svgCode}
                  </pre>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(svgCode);
                      showModal("Copied", "SVG code copied to clipboard!");
                    }}
                    className="absolute top-2 right-2 bg-gray-200 p-1 rounded hover:bg-gray-300"
                    title="Copy to clipboard"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                      <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="text-sm text-gray-600">
                <p>To use this SVG:</p>
                <ol className="list-decimal ml-5 mt-1">
                  <li>Copy the code above</li>
                  <li>Create a new file with a .svg extension</li>
                  <li>Paste the code into the file</li>
                  <li>Save it as "language_name_sample.svg"</li>
                </ol>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-64 bg-gray-100 rounded text-gray-500">
              Select a language to generate an SVG
            </div>
          )}
        </div>
      </div>
      
      {/* Add Language Form Section */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow">
        {/* Add Reset Button
        <div className="flex justify-end mb-2">
          <button
            onClick={() => {
              const doReset = window.confirm("Are you sure you want to reset to default languages? All custom languages will be removed.");
              if (doReset) {
                setAllLanguages(initialLanguages);
                if (typeof window !== 'undefined') {
                  localStorage.removeItem('languageCollection');
                }
                showModal("Reset Complete", "Languages have been reset to default.");
              }
            }}
            className="text-xs text-red-500 hover:text-red-700"
          >
            Reset to Default Languages
          </button>
        </div> */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Language</h2>
          <button 
            onClick={() => setShowAddForm(!showAddForm)} 
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
            style={{ 
              transition: 'background-color 0.3s',
              ':hover': { backgroundColor: 'oklch(0.707 0.165 254.624)' }
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'oklch(0.707 0.165 254.624)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}
          >
            {showAddForm ? 'Hide Form' : 'Show Form'}
          </button>
        </div>
        
        {showAddForm && (
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Language Name:</label>
              <input
                type="text"
                value={newLanguageName}
                onChange={(e) => setNewLanguageName(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="e.g., Zulu or Spanish"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Sample Text:</label>
              <textarea
                value={newLanguageSample}
                onChange={(e) => setNewLanguageSample(e.target.value)}
                className="w-full p-2 border rounded"
                rows="2"
                dir={isRtl ? 'rtl' : 'ltr'}
                placeholder="Enter text in this language"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rtlCheck"
                checked={isRtl}
                onChange={(e) => setIsRtl(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="rtlCheck" className="text-sm">Right-to-left language</label>
            </div>
            <button
              onClick={addNewLanguage}
              className="bg-blue-500 text-white p-2 rounded hover:bg-green-600"
              style={{ 
                transition: 'background-color 0.3s',
                ':hover': { backgroundColor: 'oklch(0.707 0.165 254.624)' }
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'oklch(0.707 0.165 254.624)'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}
            >
              Add Language
            </button>
            {/* <p className="text-xs text-gray-500 mt-2">
              Note: Added languages will be saved in your browser and remain available even after refreshing the page.
            </p> */}
          </div>
        )}
      </div>
      
      {selectedLanguage && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">All Languages Preview</h2>
          <p className="text-sm text-gray-600 mb-4">Here's a quick preview of how your current color scheme would look for all languages:</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...allLanguages]
              .sort((a, b) => a.name.localeCompare(b.name))
              .map(lang => (
                <div key={lang.name} className="border rounded p-2 text-center">
                  <div className="text-sm font-medium mb-1">{lang.name}</div>
                  <div 
                    className="text-xs bg-gray-50 p-2 rounded overflow-hidden" 
                    dir={lang.rtl ? 'rtl' : 'ltr'}
                    style={{
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: backgroundColor,
                      color: textColor,
                      border: `1px solid ${borderColor}`
                    }}
                  >
                    {lang.sampleText}
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSampleGenerator;