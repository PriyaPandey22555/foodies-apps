import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import "./MoodChef.css";

const MOODS = [
  { id: "happy", emoji: "😄", label: "Happy", desc: "Feeling great!", color: "rgba(255,215,0,0.35)", keywords: ["sweet","cake","ice cream","burger","pizza"] },
  { id: "sad", emoji: "😢", label: "Sad", desc: "Need comfort", color: "rgba(100,149,237,0.35)", keywords: ["warm","soup","noodles","biryani","pasta"] },
  { id: "stressed", emoji: "😤", label: "Stressed", desc: "Need a break", color: "rgba(255,99,71,0.35)", keywords: ["light","salad","sandwich","wrap","rolls"] },
  { id: "romantic", emoji: "❤️", label: "Romantic", desc: "Date night", color: "rgba(220,20,60,0.35)", keywords: ["pasta","pizza","chocolate","cake","dessert"] },
  { id: "energetic", emoji: "⚡", label: "Energetic", desc: "Power up!", color: "rgba(50,205,50,0.35)", keywords: ["protein","salad","bowl","grilled","chicken"] },
  { id: "lazy", emoji: "😴", label: "Lazy", desc: "Easy & quick", color: "rgba(147,112,219,0.35)", keywords: ["pizza","burger","fries","noodles"] },
  { id: "spicy", emoji: "🌶️", label: "Spicy", desc: "Bold flavors!", color: "rgba(255,69,0,0.35)", keywords: ["spicy","biryani","curry","masala","tandoori"] },
  { id: "healthy", emoji: "🥗", label: "Healthy", desc: "Clean eating", color: "rgba(0,200,100,0.35)", keywords: ["salad","bowl","fruit","vegetable","fresh"] },
];

const MoodChef = () => {
  const { foodList, increaseQty, token } = useContext(StoreContext);
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [aiMessage, setAiMessage] = useState("");
  const [suggestedFoods, setSuggestedFoods] = useState([]);
  const [hasResult, setHasResult] = useState(false);
  const [addedIds, setAddedIds] = useState({});

  const callMoodChefAI = async (mood) => {
    const foodNames = foodList.map((f) => f.name).join(", ");
    const prompt = `You are a friendly AI Food Chef. A user is feeling "${mood.label}" (${mood.desc}).
Available foods: ${foodNames || "Pizza, Burger, Biryani, Noodles, Salad, Ice Cream, Rolls, Cake"}
Write a warm 1-2 sentence message and pick 3-4 foods from the list for this mood.
Respond ONLY in JSON (no markdown, no extra text):
{"message": "your message here", "foods": ["Food 1", "Food 2", "Food 3"]}`;

    const response = await fetch("http://localhost:8080/api/ai/mood-chef", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    // Gemini response: { text: "..." }
    const text = data.text || "{}";
    const clean = text.replace(/```json|```/g, "").trim();
    return JSON.parse(clean);
  };

  const matchFoods = (names) => {
    const matched = [];
    names.forEach((name) => {
      const found = foodList.find((f) =>
        f.name?.toLowerCase().includes(name.toLowerCase()) ||
        name.toLowerCase().includes(f.name?.toLowerCase())
      );
      if (found && !matched.find((m) => m.id === found.id)) matched.push(found);
    });
    if (matched.length < 2 && selectedMood) {
      foodList.forEach((food) => {
        if (matched.length >= 4) return;
        if (!matched.find((m) => m.id === food.id)) {
          const n = food.name?.toLowerCase() || "";
          if (selectedMood.keywords.some((k) => n.includes(k))) matched.push(food);
        }
      });
    }
    return matched.slice(0, 4);
  };

  const handleGenerate = async () => {
    if (!selectedMood) return;
    setIsLoading(true);
    setHasResult(false);
    try {
      const result = await callMoodChefAI(selectedMood);
      setAiMessage(result.message || `Perfect foods for your ${selectedMood.label} mood!`);
      setSuggestedFoods(matchFoods(result.foods || []));
      setHasResult(true);
    } catch (error) {
      console.error("AI Error:", error);
      const fallback = foodList.filter((f) =>
        selectedMood.keywords.some((k) => f.name?.toLowerCase().includes(k))
      ).slice(0, 4);
      setAiMessage(`You're feeling ${selectedMood.label}? Here are perfect picks! 🍽️`);
      setSuggestedFoods(fallback.length > 0 ? fallback : foodList.slice(0, 4));
      setHasResult(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = async (food) => {
    if (!token) { navigate("/login"); return; }
    await increaseQty(food.id);
    setAddedIds((prev) => ({ ...prev, [food.id]: true }));
    setTimeout(() => setAddedIds((prev) => ({ ...prev, [food.id]: false })), 2000);
  };

  const handleReset = () => {
    setSelectedMood(null); setHasResult(false);
    setAiMessage(""); setSuggestedFoods([]); setAddedIds({});
  };

  return (
    <div className="mood-chef-page">
      <div className="mood-hero">
        <span className="mood-hero-emoji">🧑‍🍳</span>
        <h1>AI Mood Chef</h1>
        <p>Tell me how you feel — I'll serve the perfect dish for your soul ✨</p>
      </div>

      {!hasResult && (
        <div className="mood-section">
          <p className="mood-section-title">How are you feeling today?</p>
          <div className="mood-grid">
            {MOODS.map((mood) => (
              <button key={mood.id}
                className={`mood-btn ${selectedMood?.id === mood.id ? "selected" : ""}`}
                style={{ "--mood-color": mood.color }}
                onClick={() => setSelectedMood(mood)}>
                <span className="mood-btn-emoji">{mood.emoji}</span>
                <span className="mood-btn-label">{mood.label}</span>
                <span className="mood-btn-desc">{mood.desc}</span>
              </button>
            ))}
          </div>
          <div className="generate-section">
            <button className="generate-btn" onClick={handleGenerate} disabled={!selectedMood || isLoading}>
              {isLoading ? "🤔 Chef is thinking..." : "✨ Get My Food Picks"}
            </button>
            {!selectedMood && <p style={{color:"rgba(255,255,255,0.3)",fontSize:"0.8rem",marginTop:"12px"}}>Select a mood first</p>}
          </div>
        </div>
      )}

      {isLoading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">AI Chef is curating dishes for your <strong style={{color:"#e63946"}}>{selectedMood?.label}</strong> mood...</p>
        </div>
      )}

      {hasResult && !isLoading && (
        <div className="result-section">
          <div className="result-header">
            <h2>{selectedMood?.emoji} Perfect Picks for Your {selectedMood?.label} Mood</h2>
            <p>Handpicked by AI Chef just for you</p>
          </div>
          <div className="ai-message-box">
            <span className="ai-badge">🤖 AI Chef says</span>
            <p className="ai-message-text">{aiMessage}</p>
          </div>
          {suggestedFoods.length > 0 ? (
            <div className="suggested-foods-grid">
              {suggestedFoods.map((food, i) => (
                <div key={food.id} className="suggested-food-card"
                  style={{animationDelay:`${i*0.12}s`}}
                  onClick={() => navigate(`/food/${food.id}`)}>
                  {food.imageUrl
                    ? <img src={food.imageUrl} alt={food.name} className="suggested-food-img" />
                    : <div className="suggested-food-img-placeholder">🍽️</div>
                  }
                  <div className="suggested-food-info">
                    <div className="suggested-food-name">{food.name}</div>
                    {food.category && <span className="suggested-food-category">{food.category}</span>}
                    <div className="suggested-food-price">₹{food.price}</div>
                    {food.description && <p className="suggested-food-desc">{food.description}</p>}
                    <button className="add-to-cart-btn"
                      onClick={(e) => { e.stopPropagation(); handleAddToCart(food); }}>
                      {addedIds[food.id] ? "✓ Added!" : "🛒 Add to Cart"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-match-msg"><p>🍽️ Menu abhi empty hai. Admin panel mein food add karo!</p></div>
          )}
          <button className="try-again-btn" onClick={handleReset}>↩ Try Another Mood</button>
        </div>
      )}
    </div>
  );
};

export default MoodChef;
