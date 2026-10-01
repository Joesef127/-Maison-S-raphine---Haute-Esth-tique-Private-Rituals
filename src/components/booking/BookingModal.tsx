import React, { useState } from 'react';
import { 
  X, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Sparkles, 
  CreditCard,
  CheckCircle,
  AlertCircle,
  FileCheck
} from 'lucide-react';
import { ServiceItem, AddOnItem, Practitioner } from '../../types';
import { SERVICES, ADD_ONS } from '../../data/services';
import { PRACTITIONERS } from '../../data/practitioners';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedService?: ServiceItem | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preSelectedService
}) => {
  if (!isOpen) return null;

  // Multi-step state: 1: Service, 2: Add-ons & Practitioner, 3: Date & Time, 4: Client Info, 5: Review & Confirm
  const [step, setStep] = useState<number>(preSelectedService ? 2 : 1);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(preSelectedService || SERVICES[0]);
  const [selectedAddOns, setSelectedAddOns] = useState<AddOnItem[]>([]);
  const [selectedPractitioner, setSelectedPractitioner] = useState<Practitioner | null>(PRACTITIONERS[0]);
  const [selectedLocation, setSelectedLocation] = useState<'Mayfair, London' | 'Rue de la Paix, Paris'>('Mayfair, London');

  // Dates: Next 7 days
  const today = new Date();
  const availableDates = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i + 1);
    return {
      iso: d.toISOString().split('T')[0],
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNumber: d.getDate(),
      month: d.toLocaleDateString('en-US', { month: 'short' })
    };
  });

  const [selectedDate, setSelectedDate] = useState<string>(availableDates[0].iso);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('11:00 AM');

  // Client Details
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientNotes, setClientNotes] = useState('');
  const [clientAllergies, setClientAllergies] = useState('');

  // Confirmation state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [bookingCode, setBookingCode] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  // Time Slots
  const timeSlots = [
    { time: '10:00 AM', period: 'Morning' },
    { time: '11:30 AM', period: 'Morning' },
    { time: '01:00 PM', period: 'Afternoon' },
    { time: '02:30 PM', period: 'Afternoon' },
    { time: '04:00 PM', period: 'Afternoon' },
    { time: '05:30 PM', period: 'Evening' },
    { time: '07:00 PM', period: 'Evening' }
  ];

  // Price calculations
  const servicePrice = selectedService?.price || 0;
  const addOnsPrice = selectedAddOns.reduce((sum, item) => sum + item.price, 0);
  const totalPrice = servicePrice + addOnsPrice;

  const serviceDuration = selectedService?.duration || 0;
  const addOnsDuration = selectedAddOns.reduce((sum, item) => sum + item.duration, 0);
  const totalDuration = serviceDuration + addOnsDuration;

  // Toggle add-on
  const toggleAddOn = (addon: AddOnItem) => {
    if (selectedAddOns.some((a) => a.id === addon.id)) {
      setSelectedAddOns(selectedAddOns.filter((a) => a.id !== addon.id));
    } else {
      setSelectedAddOns([...selectedAddOns, addon]);
    }
  };

  const handleNextStep = () => {
    setValidationError(null);
    if (step === 1 && !selectedService) {
      setValidationError('Please select a ritual to continue.');
      return;
    }
    if (step === 3 && (!selectedDate || !selectedTimeSlot)) {
      setValidationError('Please select an appointment date and time slot.');
      return;
    }
    if (step === 4) {
      if (!clientName.trim()) {
        setValidationError('Please provide your full name.');
        return;
      }
      if (!clientEmail.trim() || !clientEmail.includes('@')) {
        setValidationError('Please provide a valid personal email address.');
        return;
      }
      if (!clientPhone.trim()) {
        setValidationError('Please provide a contact phone number for sanctuary confirmation.');
        return;
      }
    }
    setStep(step + 1);
  };

  const handleConfirmReservation = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const code = 'MS-' + Math.floor(100000 + Math.random() * 900000);
      setBookingCode(code);
      setIsConfirmed(true);
    }, 1200);
  };

  const handleReset = () => {
    setIsConfirmed(false);
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#181615]/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-[#FAF8F5] border border-[#EAE2D8] w-full max-w-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Modal Top Bar */}
        <div className="bg-[#1E1C1A] text-white p-6 flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#B89366] block font-medium">
              Private Reservation
            </span>
            <h3 className="font-serif text-2xl text-[#FAF8F5]">
              Maison Séraphine Sanctuary
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#D9CEBF] hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Step Indicator (Unless confirmed) */}
        {!isConfirmed && (
          <div className="border-b border-[#EAE2D8] bg-[#F4EFEB] px-6 py-3 flex items-center justify-between text-xs text-[#7A736C]">
            <div className="flex items-center gap-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-[#1E1C1A] text-white' : 'bg-[#D9CEBF] text-[#7A736C]'}`}>1</span>
              <span className={step === 1 ? 'text-[#1E1C1A] font-medium' : ''}>Ritual</span>
            </div>
            <span className="text-[#D9CEBF]">/</span>
            <div className="flex items-center gap-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-[#1E1C1A] text-white' : 'bg-[#D9CEBF] text-[#7A736C]'}`}>2</span>
              <span className={step === 2 ? 'text-[#1E1C1A] font-medium' : ''}>Artisan & Add-ons</span>
            </div>
            <span className="text-[#D9CEBF]">/</span>
            <div className="flex items-center gap-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 3 ? 'bg-[#1E1C1A] text-white' : 'bg-[#D9CEBF] text-[#7A736C]'}`}>3</span>
              <span className={step === 3 ? 'text-[#1E1C1A] font-medium' : ''}>Date & Time</span>
            </div>
            <span className="text-[#D9CEBF]">/</span>
            <div className="flex items-center gap-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 4 ? 'bg-[#1E1C1A] text-white' : 'bg-[#D9CEBF] text-[#7A736C]'}`}>4</span>
              <span className={step >= 4 ? 'text-[#1E1C1A] font-medium' : ''}>Guest Details</span>
            </div>
            <span className="text-[#D9CEBF]">/</span>
            <div className="flex items-center gap-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 5 ? 'bg-[#1E1C1A] text-white' : 'bg-[#D9CEBF] text-[#7A736C]'}`}>5</span>
              <span className={step === 5 ? 'text-[#1E1C1A] font-medium' : ''}>Review</span>
            </div>
          </div>
        )}

        {/* Validation error notification */}
        {validationError && (
          <div className="bg-red-50 border-b border-red-200 p-3 px-6 text-xs text-red-800 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 md:p-8 max-h-[60vh] overflow-y-auto">

          {/* STEP 1: CHOOSE SERVICE */}
          {step === 1 && !isConfirmed && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h4 className="font-serif text-xl text-[#1E1C1A]">Select Your Primary Treatment</h4>
                <p className="text-xs text-[#7A736C]">Browse our curated suite of haute esthétique services.</p>
              </div>

              <div className="space-y-3">
                {SERVICES.map((srv) => {
                  const isSelected = selectedService?.id === srv.id;
                  return (
                    <div
                      key={srv.id}
                      onClick={() => setSelectedService(srv)}
                      className={`p-4 border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        isSelected
                          ? 'border-[#987547] bg-[#FAF6F0]'
                          : 'border-[#EAE2D8] bg-white hover:border-[#B89366]'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase tracking-wider text-[#987547] font-medium">
                            {srv.categoryLabel}
                          </span>
                          {srv.signature && (
                            <span className="text-[10px] text-[#7A736C]">· Signature Ritual</span>
                          )}
                        </div>
                        <h5 className="font-serif text-lg text-[#1E1C1A]">{srv.name}</h5>
                        <p className="text-xs text-[#7A736C] line-clamp-1">{srv.tagline}</p>
                      </div>

                      <div className="flex sm:flex-col items-baseline sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-[#F4EFEB]">
                        <span className="font-serif text-lg font-medium text-[#1E1C1A] tabular-nums">
                          ${srv.price}
                        </span>
                        <span className="text-[11px] text-[#7A736C] tabular-nums">
                          {srv.duration} mins
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: ARTISAN & ADD-ONS */}
          {step === 2 && !isConfirmed && (
            <div className="space-y-8">
              {/* Location Select */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-[#1E1C1A] font-medium block">
                  Select Sanctuary Location
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(['Mayfair, London', 'Rue de la Paix, Paris'] as const).map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => setSelectedLocation(loc)}
                      className={`p-3 text-left border text-xs transition-colors ${
                        selectedLocation === loc
                          ? 'border-[#987547] bg-[#FAF6F0] font-medium text-[#1E1C1A]'
                          : 'border-[#EAE2D8] bg-white text-[#7A736C]'
                      }`}
                    >
                      <div>{loc}</div>
                      <span className="text-[10px] text-[#987547]">Private Suite</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Master Practitioner */}
              <div className="space-y-3">
                <label className="text-xs uppercase tracking-wider text-[#1E1C1A] font-medium block">
                  Preferred Master Artisan (Optional)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PRACTITIONERS.map((pr) => {
                    const isSelected = selectedPractitioner?.id === pr.id;
                    return (
                      <div
                        key={pr.id}
                        onClick={() => setSelectedPractitioner(pr)}
                        className={`p-3.5 border cursor-pointer transition-all ${
                          isSelected
                            ? 'border-[#987547] bg-[#FAF6F0]'
                            : 'border-[#EAE2D8] bg-white hover:border-[#B89366]'
                        }`}
                      >
                        <div className="font-serif text-base text-[#1E1C1A]">{pr.name}</div>
                        <div className="text-[11px] text-[#987547]">{pr.role}</div>
                        <div className="text-[10px] text-[#7A736C] mt-1">{pr.specialty}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Complementary Add-ons */}
              <div className="space-y-3">
                <label className="text-xs uppercase tracking-wider text-[#1E1C1A] font-medium block">
                  Curated Ritual Enhancements
                </label>
                <div className="space-y-2">
                  {ADD_ONS.map((addon) => {
                    const isChecked = selectedAddOns.some((a) => a.id === addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddOn(addon)}
                        className={`p-3 border flex items-center justify-between cursor-pointer transition-colors ${
                          isChecked
                            ? 'border-[#987547] bg-[#FAF6F0]'
                            : 'border-[#EAE2D8] bg-white hover:border-[#B89366]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 border flex items-center justify-center text-white ${
                            isChecked ? 'bg-[#1E1C1A] border-[#1E1C1A]' : 'border-[#D9CEBF] bg-white'
                          }`}>
                            {isChecked && <Check className="w-3 h-3 text-[#B89366]" />}
                          </div>
                          <div>
                            <div className="text-xs font-medium text-[#1E1C1A]">{addon.name}</div>
                            <div className="text-[11px] text-[#7A736C]">{addon.description}</div>
                          </div>
                        </div>
                        <div className="text-right pl-3 shrink-0">
                          <span className="text-xs font-medium text-[#1E1C1A] tabular-nums">+${addon.price}</span>
                          <span className="text-[10px] text-[#7A736C] block tabular-nums">+{addon.duration}m</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: DATE & TIME */}
          {step === 3 && !isConfirmed && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h4 className="font-serif text-xl text-[#1E1C1A]">Sanctuary Availability</h4>
                <p className="text-xs text-[#7A736C]">Times adjusted to your selected master artisan.</p>
              </div>

              {/* Date Selector */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-[#1E1C1A] font-medium block">
                  Select Date
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {availableDates.map((date) => {
                    const isSelected = selectedDate === date.iso;
                    return (
                      <button
                        key={date.iso}
                        type="button"
                        onClick={() => setSelectedDate(date.iso)}
                        className={`p-3 text-center border transition-all ${
                          isSelected
                            ? 'border-[#987547] bg-[#1E1C1A] text-white shadow-sm'
                            : 'border-[#EAE2D8] bg-white text-[#524B45] hover:border-[#B89366]'
                        }`}
                      >
                        <div className="text-[10px] uppercase tracking-wider opacity-70">{date.dayName}</div>
                        <div className="text-lg font-serif font-medium my-0.5">{date.dayNumber}</div>
                        <div className="text-[10px] opacity-70">{date.month}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots */}
              <div className="space-y-2 pt-2">
                <label className="text-xs uppercase tracking-wider text-[#1E1C1A] font-medium block">
                  Available Sanctuary Hours
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {timeSlots.map((slot) => {
                    const isSelected = selectedTimeSlot === slot.time;
                    return (
                      <button
                        key={slot.time}
                        type="button"
                        onClick={() => setSelectedTimeSlot(slot.time)}
                        className={`py-3 px-3 text-center border text-xs font-medium transition-all ${
                          isSelected
                            ? 'border-[#987547] bg-[#FAF6F0] text-[#1E1C1A] font-semibold ring-1 ring-[#987547]'
                            : 'border-[#EAE2D8] bg-white text-[#524B45] hover:border-[#B89366]'
                        }`}
                      >
                        <div>{slot.time}</div>
                        <span className="text-[10px] text-[#7A736C] font-normal">{slot.period}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: GUEST DETAILS */}
          {step === 4 && !isConfirmed && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h4 className="font-serif text-xl text-[#1E1C1A]">Guest Profile</h4>
                <p className="text-xs text-[#7A736C]">Your information is held in strict European confidentiality.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-[#1E1C1A] font-medium block">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Madame / Monsieur"
                    className="w-full p-2.5 bg-white border border-[#D9CEBF] text-xs text-[#1E1C1A] focus:outline-none focus:border-[#B89366]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-[#1E1C1A] font-medium block">
                    Personal Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="client@luxury.com"
                    className="w-full p-2.5 bg-white border border-[#D9CEBF] text-xs text-[#1E1C1A] focus:outline-none focus:border-[#B89366]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-[#1E1C1A] font-medium block">
                    Mobile Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="+44 7946 088200"
                    className="w-full p-2.5 bg-white border border-[#D9CEBF] text-xs text-[#1E1C1A] focus:outline-none focus:border-[#B89366]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-[#1E1C1A] font-medium block">
                    Skin / Lash Sensitivities or Allergies
                  </label>
                  <input
                    type="text"
                    value={clientAllergies}
                    onChange={(e) => setClientAllergies(e.target.value)}
                    placeholder="e.g. Cyanoacrylate, latex, essential oils"
                    className="w-full p-2.5 bg-white border border-[#D9CEBF] text-xs text-[#1E1C1A] focus:outline-none focus:border-[#B89366]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-[#1E1C1A] font-medium block">
                  Bespoke Notes or Refreshment Preferences
                </label>
                <textarea
                  rows={2}
                  value={clientNotes}
                  onChange={(e) => setClientNotes(e.target.value)}
                  placeholder="Quiet appointment preference, champagne selection, valet assistance..."
                  className="w-full p-2.5 bg-white border border-[#D9CEBF] text-xs text-[#1E1C1A] focus:outline-none focus:border-[#B89366]"
                />
              </div>
            </div>
          )}

          {/* STEP 5: REVIEW & CONFIRM */}
          {step === 5 && !isConfirmed && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h4 className="font-serif text-xl text-[#1E1C1A]">Review Sanctuary Appointment</h4>
                <p className="text-xs text-[#7A736C]">Kindly verify your ritual details before booking.</p>
              </div>

              <div className="bg-white border border-[#EAE2D8] p-5 space-y-4 text-xs">
                <div className="flex justify-between items-start pb-3 border-b border-[#F4EFEB]">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#987547] block">
                      {selectedLocation}
                    </span>
                    <strong className="font-serif text-base text-[#1E1C1A] block">
                      {selectedService?.name}
                    </strong>
                    <span className="text-[#7A736C]">{selectedService?.duration} mins</span>
                  </div>
                  <span className="font-serif text-base text-[#1E1C1A] font-medium tabular-nums">
                    ${selectedService?.price}
                  </span>
                </div>

                {selectedAddOns.length > 0 && (
                  <div className="space-y-1.5 pb-3 border-b border-[#F4EFEB]">
                    <span className="text-[10px] uppercase tracking-wider text-[#7A736C] block">
                      Ritual Add-ons:
                    </span>
                    {selectedAddOns.map((a) => (
                      <div key={a.id} className="flex justify-between text-[#524B45]">
                        <span>+ {a.name} ({a.duration}m)</span>
                        <span className="tabular-nums">+${a.price}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 pb-3 border-b border-[#F4EFEB]">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#7A736C] block">Artisan</span>
                    <span className="text-[#1E1C1A] font-medium">{selectedPractitioner?.name}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#7A736C] block">Schedule</span>
                    <span className="text-[#1E1C1A] font-medium">{selectedDate} at {selectedTimeSlot}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-1 text-sm font-semibold text-[#1E1C1A]">
                  <span>Total Estimated Sanctuary Fee ({totalDuration} mins)</span>
                  <span className="font-serif text-xl tabular-nums text-[#987547]">${totalPrice}</span>
                </div>
              </div>

              <p className="text-[11px] text-[#7A736C] leading-relaxed">
                Payment is settled upon completion of your ritual at the sanctuary reception. We request a 24-hour courtesy notification for any schedule adjustments.
              </p>
            </div>
          )}

          {/* CONFIRMATION STATE */}
          {isConfirmed && (
            <div className="py-8 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#FAF6F0] border border-[#B89366] text-[#987547] flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <span className="text-xs uppercase tracking-[0.3em] text-[#987547] font-medium">
                  Reservation Confirmed
                </span>
                <h3 className="font-serif text-3xl text-[#1E1C1A]">
                  We Await Your Presence
                </h3>
                <p className="text-xs text-[#7A736C] leading-relaxed font-light">
                  A private confirmation dossier has been sent to <strong>{clientEmail}</strong>. Please arrive ten minutes prior to enjoy our bespoke herbal infusion.
                </p>
              </div>

              {/* Reference Card */}
              <div className="bg-[#FAF6F0] border border-[#E0D7C9] p-5 max-w-sm mx-auto text-left space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#7A736C]">Booking Dossier:</span>
                  <strong className="font-mono text-[#1E1C1A]">{bookingCode}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A736C]">Sanctuary:</span>
                  <span className="text-[#1E1C1A]">{selectedLocation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A736C]">Ritual:</span>
                  <span className="text-[#1E1C1A]">{selectedService?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A736C]">Appointment:</span>
                  <span className="text-[#1E1C1A]">{selectedDate} · {selectedTimeSlot}</span>
                </div>
              </div>

              <div className="flex justify-center gap-3">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-[#1E1C1A] hover:bg-[#34302C] text-white text-xs uppercase tracking-wider font-medium transition-colors"
                >
                  Return to Atelier
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Action Controls (Unless Confirmed) */}
        {!isConfirmed && (
          <div className="p-6 bg-[#F4EFEB] border-t border-[#EAE2D8] flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 text-xs uppercase tracking-wider text-[#524B45] hover:text-[#1E1C1A] transition-colors flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>
            ) : (
              <div />
            )}

            {step < 5 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="px-6 py-2.5 bg-[#1E1C1A] hover:bg-[#34302C] text-white text-xs uppercase tracking-wider font-medium transition-colors flex items-center gap-1.5"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4 text-[#B89366]" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleConfirmReservation}
                disabled={isSubmitting}
                className="px-8 py-2.5 bg-[#987547] hover:bg-[#806037] text-white text-xs uppercase tracking-wider font-medium transition-colors flex items-center gap-2"
              >
                {isSubmitting ? (
                  <span>Securing Suite...</span>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Confirm Private Sanctuary</span>
                  </>
                )}
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
