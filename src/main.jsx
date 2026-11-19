import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  CarFront, ShieldCheck, Clock3, MapPin, Instagram, Menu, X,
  Search, CalendarDays, Users, Fuel, ChevronRight, MessageCircle,
  LogOut, ArrowLeft, CheckCircle2, AlertCircle, KeyRound, UserPlus
} from "lucide-react";
import "./styles.css";

const WHATSAPP_DISPLAY = "7981124035";
// IMPORTANT: WhatsApp click-to-chat requires a valid country code + 10-digit Indian mobile number.
// Replace this value after confirming the correct number. Example format: "917981124035".
const WHATSAPP_LINK_NUMBER = "9390606077";
const INSTAGRAM_HANDLE = "Mgselfdrives";
const LOCATION = "Raparthinagar, near Hanuman Temple, Khammam, Telangana";

const cars = [
  { id: 1, name: "Maruti Suzuki Swift", category: "Hatchback", hours12: 1400, hours24: 1999, seats: 5, fuel: "Petrol", image: "https://res.cloudinary.com/hgrgfolm/image/upload/f_auto,q_auto/swift_red", tag: "City favourite" },
  { id: 2, name: "Maruti Suzuki Swift", category: "Hatchback", hours12: 1400, hours24: 1999, seats: 5, fuel: "Petrol", image: "https://res.cloudinary.com/hgrgfolm/image/upload/f_auto,q_auto/maruthi_red", tag: "Easy drive" },
  { id: 3, name: "Maruti Suzuki Swift Dzire", category: "Sedan", hours12: 1500, hours24: 2200, seats: 5, fuel: "Petrol", image: "https://res.cloudinary.com/hgrgfolm/image/upload/f_auto,q_auto/dzire", tag: "Comfort sedan" },
  { id: 4, name: "Maruti Suzuki Brezza", category: "SUV", hours12: 1700, hours24: 2300, seats: 5, fuel: "Petrol", image: "https://res.cloudinary.com/hgrgfolm/image/upload/f_auto,q_auto/maruti_brezza", tag: "Compact SUV" },
  { id: 5, name: "Maruti Suzuki Ciaz", category: "Sedan", hours12: 1700, hours24: 2300, seats: 5, fuel: "Petrol", image: "https://res.cloudinary.com/hgrgfolm/image/upload/f_auto,q_auto/ciaz", tag: "Premium comfort" },
  { id: 6, name: "Kia Sonet", category: "SUV", hours12: 1700, hours24: 2500, seats: 5, fuel: "Petrol", image: "https://res.cloudinary.com/hgrgfolm/image/upload/f_auto,q_auto/kia_sonet", tag: "Urban SUV" },
  { id: 7, name: "Hyundai i20 Sunroof", category: "Hatchback", hours12: 1700, hours24: 2500, seats: 5, fuel: "Petrol", image: "https://res.cloudinary.com/hgrgfolm/image/upload/f_auto,q_auto/sunroof", tag: "Sunroof" },
  { id: 8, name: "Hyundai i20 White", category: "Hatchback", hours12: 1500, hours24: 2200, seats: 5, fuel: "Petrol", image: "https://res.cloudinary.com/hgrgfolm/image/upload/f_auto,q_auto/hyudai_i20_white", tag: "Clean & stylish" },
  { id: 9, name: "Toyota Glanza", category: "Hatchback", hours12: 1500, hours24: 2200, seats: 5, fuel: "Petrol", image: "https://res.cloudinary.com/hgrgfolm/image/upload/f_auto,q_auto/Toyota-Glanza-Festive-Edition-Price" },
  { id: 10, name: "Toyota Tigor", category: "Sedan", hours12: 1500, hours24: 2300, seats: 5, fuel: "Petrol", image: "https://res.cloudinary.com/hgrgfolm/image/upload/f_auto,q_auto/toyata_tigor", tag: "Compact sedan" },
  { id: 11, name: "Mahindra Thar", category: "SUV", hours12: 2500, hours24: 4500, seats: 4, fuel: "Diesel / Petrol", image: "https://res.cloudinary.com/hgrgfolm/image/upload/f_auto,q_auto/mahindra_thar", tag: "Adventure pick" },
  { id: 12, name: "Mahindra XUV700", category: "SUV", hours12: 3000, hours24: 5000, seats: 7, fuel: "Petrol / Diesel", image: "https://res.cloudinary.com/hgrgfolm/image/upload/f_auto,q_auto/mahindra_xuv_700", tag: "Spacious SUV" },
  { id: 13, name: "Maruti Suzuki Ertiga", category: "MUV", hours12: 2500, hours24: 3500, seats: 7, fuel: "Petrol / CNG", image: "https://res.cloudinary.com/hgrgfolm/image/upload/f_auto,q_auto/images", tag: "Family trips" },
  { id: 14, name: "Kia Carens", category: "MUV", hours12: 2500, hours24: 4000, seats: 7, fuel: "Petrol / Diesel", image: "https://res.cloudinary.com/hgrgfolm/image/upload/f_auto,q_auto/kia_carens", tag: "Room for everyone" },
  { id: 15, name: "Toyota Innova Crysta", category: "MUV", hours12: 3000, hours24: 5500, seats: 7, fuel: "Diesel", image: "https://res.cloudinary.com/hgrgfolm/image/upload/f_auto,q_auto/toyata_innova_crysta", tag: "Long-distance comfort" },
  { id: 16, name: "Jeep Wrangler", category: "SUV", hours12: 4000, hours24: 7000, seats: 5, fuel: "Petrol / Diesel", image: "https://res.cloudinary.com/hgrgfolm/image/upload/f_auto,q_auto/jeep_Wrangler", tag: "Premium adventure" },
  { id: 17, name: "Renault Kiger", category: "SUV", hours12: 1200, hours24: 2000, seats: 5, fuel: "Petrol", image: "https://res.cloudinary.com/hgrgfolm/image/upload/f_auto,q_auto/renault_kiger", tag: "Budget SUV" },
  { id: 18, name: "Tata Nexon", category: "SUV", hours12: 1200, hours24: 2000, seats: 5, fuel: "Petrol / Diesel", image: "https://res.cloudinary.com/hgrgfolm/image/upload/f_auto,q_auto/tata_nexon", tag: "Everyday SUV" },
  { id: 19, name: "Maruti Suzuki Grand Vitara", category: "SUV", hours12: 1800, hours24: 2500, seats: 5, fuel: "Petrol / Hybrid", image: "https://res.cloudinary.com/hgrgfolm/image/upload/f_auto,q_auto/maruthi_grand_vitara", tag: "Premium crossover" }
];

const money = (value) => `₹${value.toLocaleString("en-IN")}`;

function App() {
  const [screen, setScreen] = useState("login");
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("mgUser") || "null"); } catch { return null; }
  });
  const [authMode, setAuthMode] = useState("login");
  const [authError, setAuthError] = useState("");
  const [authSuccess, setAuthSuccess] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [duration, setDuration] = useState("12");
  const [bookingCar, setBookingCar] = useState(null);
  const [bookingMessage, setBookingMessage] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

  const visibleCars = useMemo(() => cars.filter((car) => {
    const matchesSearch = car.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || car.category === category;
    return matchesSearch && matchesCategory;
  }), [search, category]);

  function handleAuth(event) {
    event.preventDefault();
    setAuthError("");
    setAuthSuccess("");
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim().toLowerCase();
    const password = String(data.get("password") || "");
    if (authMode === "register" && name.length < 2) {
      setAuthError("Please enter your full name."); return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setAuthError("Please enter a valid email address."); return;
    }
    if (password.length < 6) {
      setAuthError("Password must contain at least 6 characters."); return;
    }
    // Demo only: credentials are stored in this browser, not on a secure server.
    const stored = JSON.parse(localStorage.getItem("mgAccounts") || "{}");
    if (authMode === "register") {
      if (stored[email]) { setAuthError("An account already exists for this email. Please log in."); return; }
      stored[email] = { name, password };
      localStorage.setItem("mgAccounts", JSON.stringify(stored));
      setAuthSuccess("Registration successful. You can now log in.");
      setAuthMode("login");
      event.currentTarget.reset();
      return;
    }
    if (!stored[email] || stored[email].password !== password) {
      setAuthError("Account not found or password is incorrect. Register first if this is your first visit."); return;
    }
    const loggedIn = { name: stored[email].name, email };
    localStorage.setItem("mgUser", JSON.stringify(loggedIn));
    setUser(loggedIn);
    setScreen("home");
  }

  function logout() {
    localStorage.removeItem("mgUser");
    setUser(null);
    setScreen("login");
    setBookingCar(null);
  }

  function openBooking(car) {
    setBookingMessage("");
    setBookingCar(car);
  }

  function submitBooking(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const car = bookingCar;
    const hours = data.get("duration");
    const price = hours === "12" ? car.hours12 : car.hours24;
    const details = {
      customer: String(data.get("customer")).trim(),
      phone: String(data.get("phone")).trim(),
      date: String(data.get("date")),
      time: String(data.get("time")),
      duration: `${hours} hours`,
      pickup: String(data.get("pickup")).trim(),
      passengers: String(data.get("passengers")),
      car: car.name,
      price
    };
    const message = [
      "Hello MG Self Drive Cars! I would like to request a booking.",
      `Name: ${details.customer}`,
      `Phone: ${details.phone}`,
      `Car: ${details.car}`,
      `Rental: ${details.duration}`,
      `Price shown: ${money(details.price)}`,
      `Pickup date: ${details.date}`,
      `Pickup time: ${details.time}`,
      `Pickup location: ${details.pickup}`,
      `Passengers: ${details.passengers}`,
      "Please confirm availability and final terms."
    ].join("\n");
    setBookingMessage(message);
    // WhatsApp opens with a prefilled booking request. Availability is not confirmed automatically.
    const waUrl = `https://wa.me/${WHATSAPP_LINK_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  }

  if (screen === "login") {
    return <AuthPage
      mode={authMode} setMode={(mode) => { setAuthMode(mode); setAuthError(""); setAuthSuccess(""); }}
      onSubmit={handleAuth} error={authError} success={authSuccess}
    />;
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="#top" onClick={() => setScreen("home")}>
          <span className="brand-mark">MG</span>
          <span><strong>MG SELF DRIVE CARS</strong><small>DRIVE YOUR DREAMS</small></span>
        </a>
        <button className="menu-toggle" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Toggle navigation">
          {mobileMenu ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav className={mobileMenu ? "nav-links open" : "nav-links"}>
          <a href="#cars" onClick={() => setMobileMenu(false)}>Our Cars</a>
          <a href="#how-it-works" onClick={() => setMobileMenu(false)}>How It Works</a>
          <a href="#contact" onClick={() => setMobileMenu(false)}>Contact</a>
          <span className="signed-in">Hi, {user?.name?.split(" ")[0] || "Driver"}</span>
          <button className="button button-outline small-button" onClick={logout}><LogOut size={15} /> Log out</button>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> YOUR JOURNEY, YOUR RULES</div>
            <h1>Find your ride.<br /><span>Own the road.</span></h1>
            <p>Reliable self-drive cars for city rides, family trips and weekend adventures around Khammam.</p>
            <div className="hero-actions">
              <a className="button button-gold" href="#cars">Explore cars <ChevronRight size={18} /></a>
              <a className="button button-ghost" href="#contact">Contact us</a>
            </div>
            <div className="hero-trust">
              <span><ShieldCheck size={17} /> Well-maintained cars</span>
              <span><Clock3 size={17} /> 12 / 24 hour plans</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-glow" />
            <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=90" alt="Car ready for a road trip" />
            <div className="floating-price"><span>STARTING FROM</span><strong>₹1,200</strong><small>12-hour rentals*</small></div>
            <div className="hero-caption"><span className="caption-dot" /> Self drive. More freedom.</div>
          </div>
        </section>

        <section className="stats-row" aria-label="Rental highlights">
          <div><strong>19</strong><span>Car options</span></div>
          <div><strong>12 / 24</strong><span>Hour plans</span></div>
          <div><strong>Khammam</strong><span>Local pickup area</span></div>
          <div><strong>Easy</strong><span>WhatsApp enquiries</span></div>
        </section>

        <section className="section cars-section" id="cars">
          <div className="section-heading">
            <div><div className="eyebrow"><span className="eyebrow-line" /> PICK YOUR RIDE</div><h2>Find the right <span>car for you.</span></h2><p>Choose a car, compare rental durations and send us a booking request.</p></div>
            <div className="car-count"><CarFront size={17} /> {visibleCars.length} cars available in catalogue</div>
          </div>
          <div className="filters">
            <label className="search-box"><Search size={18} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search cars..." /></label>
            <div className="category-filters">
              {["All", "Hatchback", "Sedan", "SUV", "MUV"].map((item) => <button key={item} className={category === item ? "filter-chip active" : "filter-chip"} onClick={() => setCategory(item)}>{item}</button>)}
            </div>
            <div className="duration-toggle" aria-label="Choose price duration">
              <button className={duration === "12" ? "active" : ""} onClick={() => setDuration("12")}>12 hours</button>
              <button className={duration === "24" ? "active" : ""} onClick={() => setDuration("24")}>24 hours</button>
            </div>
          </div>
          <div className="car-grid">
            {visibleCars.map((car) => <CarCard key={car.id} car={car} duration={duration} onBook={openBooking} />)}
          </div>
          {visibleCars.length === 0 && <div className="empty-state">No cars match your search. Try a different name or category.</div>}
          <p className="price-note">*Prices are transcribed from the supplied poster. Confirm availability, deposit, kilometre limits, fuel policy and final charges with MG Self Drive Cars before payment.</p>
        </section>

        <section className="how-section section" id="how-it-works">
          <div className="section-heading centered"><div className="eyebrow"><span className="eyebrow-line" /> SIMPLE BOOKING</div><h2>Ready in <span>three steps.</span></h2><p>Send your request and wait for the team to confirm the car and terms.</p></div>
          <div className="steps-grid">
            <div className="step-card"><div className="step-number">01</div><div className="step-icon"><CarFront /></div><h3>Choose your car</h3><p>Browse the fleet and select a 12-hour or 24-hour rental.</p></div>
            <div className="step-card"><div className="step-number">02</div><div className="step-icon"><CalendarDays /></div><h3>Share your details</h3><p>Enter your preferred date, pickup time, contact number and location.</p></div>
            <div className="step-card"><div className="step-number">03</div><div className="step-icon"><MessageCircle /></div><h3>Confirm on WhatsApp</h3><p>Your request opens in WhatsApp. The team must confirm availability.</p></div>
          </div>
        </section>

        <section className="contact-section section" id="contact">
          <div className="contact-card">
            <div className="contact-copy"><div className="eyebrow"><span className="eyebrow-line" /> LET'S HIT THE ROAD</div><h2>Your next trip<br /><span>starts here.</span></h2><p>Contact MG Self Drive Cars for availability, booking conditions and pickup information.</p>
              <div className="contact-line"><MapPin /><div><strong>Pickup area</strong><span>{LOCATION}</span></div></div>
              <div className="contact-line"><MessageCircle /><div><strong>WhatsApp / Phone</strong><span>{WHATSAPP_DISPLAY}</span></div></div>
              <div className="contact-line"><Instagram /><div><strong>Instagram</strong><a href={`https://www.instagram.com/${INSTAGRAM_HANDLE}/`} target="_blank" rel="noreferrer">@{INSTAGRAM_HANDLE}</a></div></div>
              <div className="contact-actions"><a className="button button-gold" href={`https://wa.me/${WHATSAPP_LINK_NUMBER}?text=${encodeURIComponent("Hello MG Self Drive Cars, please share car availability and booking details.")}`} target="_blank" rel="noreferrer"><MessageCircle size={17} /> Chat on WhatsApp</a><a className="button button-outline" href={`https://www.instagram.com/${INSTAGRAM_HANDLE}/`} target="_blank" rel="noreferrer"><Instagram size={17} /> Follow Instagram</a></div>
            </div>
            <div className="contact-map">
              <div className="map-decoration"><MapPin size={34} /></div>
              <div className="map-label"><span>MG SELF DRIVE CARS</span><strong>Raparthinagar</strong><small>Near Hanuman Temple, Khammam</small></div>
              <a href="https://www.google.com/maps/search/?api=1&query=Raparthinagar+near+Hanuman+Temple+Khammam+Telangana" target="_blank" rel="noreferrer" className="map-link">Open in Google Maps <ChevronRight size={16} /></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer"><a className="brand footer-brand" href="#top"><span className="brand-mark">MG</span><span><strong>MG SELF DRIVE CARS</strong><small>DRIVE YOUR DREAMS</small></span></a><p>© {new Date().getFullYear()} MG Self Drive Cars. Drive responsibly.</p><a href={`https://www.instagram.com/${INSTAGRAM_HANDLE}/`} target="_blank" rel="noreferrer"><Instagram size={17} /> @{INSTAGRAM_HANDLE}</a></footer>

      {bookingCar && <BookingModal car={bookingCar} onClose={() => setBookingCar(null)} onSubmit={submitBooking} />}
      <a className="floating-whatsapp" href={`https://wa.me/${WHATSAPP_LINK_NUMBER}?text=${encodeURIComponent("Hello MG Self Drive Cars, I have a booking enquiry.")}`} target="_blank" rel="noreferrer" aria-label="Contact on WhatsApp"><MessageCircle size={24} /></a>
    </div>
  );
}

function AuthPage({ mode, setMode, onSubmit, error, success }) {
  const isRegister = mode === "register";
  return <div className="auth-page">
    <div className="auth-image">
      <div className="auth-image-overlay" />
      <a className="brand auth-brand" href="#"><span className="brand-mark">MG</span><span><strong>MG SELF DRIVE CARS</strong><small>DRIVE YOUR DREAMS</small></span></a>
      <div className="auth-promo"><div className="eyebrow"><span className="eyebrow-line" /> MORE FREEDOM. MORE JOURNEYS.</div><h1>Every road has<br />a <span>story.</span></h1><p>Choose your ride and make the journey yours.</p><div className="auth-benefits"><span><ShieldCheck /> Well-maintained cars</span><span><Clock3 /> Flexible rental plans</span><span><MapPin /> Local pickup in Khammam</span></div></div>
      <div className="auth-image-bottom">SELF DRIVE RENTALS · KHAMMAM, TELANGANA</div>
    </div>
    <div className="auth-panel">
      <div className="auth-panel-top"><span className="mobile-logo">MG SELF DRIVE CARS</span><span className="secure-label"><KeyRound size={14} /> CUSTOMER PORTAL</span></div>
      <div className="auth-form-wrap">
        <div className="auth-icon">{isRegister ? <UserPlus /> : <CarFront />}</div>
        <div className="eyebrow"><span className="eyebrow-line" /> WELCOME TO MG</div>
        <h2>{isRegister ? "Create your account" : "Welcome back."}</h2>
        <p className="auth-subtitle">{isRegister ? "Register to start requesting your next ride." : "Log in to explore our self-drive fleet."}</p>
        {error && <div className="form-alert error"><AlertCircle size={17} /> {error}</div>}
        {success && <div className="form-alert success"><CheckCircle2 size={17} /> {success}</div>}
        <form onSubmit={onSubmit} className="auth-form">
          {isRegister && <label>Full name<input name="name" type="text" placeholder="Enter your full name" autoComplete="name" required minLength="2" /></label>}
          <label>Email address<input name="email" type="email" placeholder="you@example.com" autoComplete="email" required /></label>
          <label>Password<input name="password" type="password" placeholder="At least 6 characters" autoComplete={isRegister ? "new-password" : "current-password"} minLength="6" required /></label>
          <button className="button button-gold auth-submit" type="submit">{isRegister ? "Create account" : "Log in"} <ChevronRight size={18} /></button>
        </form>
        <div className="auth-switch">{isRegister ? "Already have an account?" : "New to MG Self Drive Cars?"} <button onClick={() => setMode(isRegister ? "login" : "register")}>{isRegister ? "Log in" : "Create account"}</button></div>
        <div className="demo-note"><ShieldCheck size={15} /> Demo frontend only. Do not use a real or reused password.</div>
      </div>
      <div className="auth-footer"><span>© {new Date().getFullYear()} MG Self Drive Cars</span><a href={`https://www.instagram.com/${INSTAGRAM_HANDLE}/`} target="_blank" rel="noreferrer"><Instagram size={15} /> @{INSTAGRAM_HANDLE}</a></div>
    </div>
  </div>;
}

function CarCard({ car, duration, onBook }) {
  const price = duration === "12" ? car.hours12 : car.hours24;
  return <article className="car-card">
    <div className="car-image-wrap"><img src={car.image} alt={car.name} loading="lazy" onError={(e) => { e.currentTarget.style.display = "none"; e.currentTarget.parentElement.classList.add("image-fallback"); }} /><span className="car-tag">{car.tag}</span><span className="car-category">{car.category}</span></div>
    <div className="car-card-body"><h3>{car.name}</h3><div className="car-specs"><span><Users size={15} /> {car.seats} seats</span><span><Fuel size={15} /> {car.fuel}</span></div>
      <div className="car-price-row"><div><span className="price-label">{duration}-hour rental</span><strong>{money(price)}</strong></div><span className="other-price">{duration === "12" ? `${money(car.hours24)} / 24h` : `${money(car.hours12)} / 12h`}</span></div>
      <button className="button button-gold book-button" onClick={() => onBook(car)}>Book this car <ChevronRight size={17} /></button>
    </div>
  </article>;
}

function BookingModal({ car, onClose, onSubmit }) {
  const [duration, setDuration] = useState("12");
  const [pickup, setPickup] = useState(LOCATION);
  const [notice, setNotice] = useState(false);
  const price = duration === "12" ? car.hours12 : car.hours24;
  const today = new Date();
  const minDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  return <div className="modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
    <section className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title">
      <div className="modal-header"><div><div className="eyebrow"><span className="eyebrow-line" /> BOOKING REQUEST</div><h2 id="booking-title">Book your ride</h2></div><button className="icon-button" onClick={onClose} aria-label="Close booking form"><X /></button></div>
      <div className="selected-car"><img src={car.image} alt="" /><div><strong>{car.name}</strong><span>{car.category} · {car.seats} seats</span></div><div className="selected-price"><strong>{money(price)}</strong><span>{duration} hours</span></div></div>
      <form className="booking-form" onSubmit={onSubmit}>
        <div className="form-grid">
          <label>Full name<input name="customer" placeholder="Your name" required minLength="2" /></label>
          <label>Mobile number<input name="phone" type="tel" placeholder="10-digit mobile number" pattern="[0-9+ ()-]{10,16}" required /></label>
          <label>Pickup date<input name="date" type="date" min={minDate} required /></label>
          <label>Pickup time<input name="time" type="time" required /></label>
          <label className="full-field">Pickup location<input name="pickup" value={pickup} onChange={(e) => setPickup(e.target.value)} required /></label>
          <label>Passengers<select name="passengers" defaultValue="2">{[1,2,3,4,5,6,7].map((n) => <option key={n} value={n}>{n} {n === 1 ? "passenger" : "passengers"}</option>)}</select></label>
          <label>Rental duration<select name="duration" value={duration} onChange={(e) => setDuration(e.target.value)}><option value="12">12 hours — {money(car.hours12)}</option><option value="24">24 hours — {money(car.hours24)}</option></select></label>
        </div>
        <div className="booking-total"><div><span>Estimated rental price</span><small>Final amount and availability require confirmation</small></div><strong>{money(price)}</strong></div>
        <button className="button button-gold auth-submit" type="submit"><MessageCircle size={18} /> Send request on WhatsApp</button>
        {notice && <p className="price-note">If WhatsApp did not open, check the configured number in src/main.jsx.</p>}
        <p className="booking-disclaimer">By sending a request, you are asking the team to confirm availability. This demo does not process payments or guarantee a reservation.</p>
      </form>
    </section>
  </div>;
}

createRoot(document.getElementById("root")).render(<React.StrictMode><App /></React.StrictMode>);