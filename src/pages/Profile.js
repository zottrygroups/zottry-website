import React, { useState } from "react";
import "../styles/account.css";

const initialContactState = {
  address: "102 Rainbow Street",
  city: "Auckland",
  postalCode: "1024",
  country: "New Zealand",
  state: "Auckland",
  phone: "+64 21 555 0123"
};

function Profile() {
  const [contactInfo, setContactInfo] = useState(initialContactState);
  const [marketingOptIn, setMarketingOptIn] = useState(true);

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setContactInfo((previous) => ({ ...previous, [name]: value }));
  };

  const handleContactSubmit = (event) => {
    event.preventDefault();
  };

  const handleNotificationsSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="account-page">
      <header className="account-page__header">
        <h1>My Profile</h1>
        <p>Manage your personal information, contact details, and communication preferences.</p>
      </header>

      <div className="account-grid account-grid--two-column">
        <section className="account-card">
          <div className="account-card__header">
            <div>
              <h2 className="account-card__title">Account Details</h2>
              <p className="account-card__description">
                Keep your personal details up to date to enjoy a seamless experience.
              </p>
            </div>
          </div>
          <div className="account-section">
            <span className="account-avatar" aria-hidden="true">
              LA
            </span>
            <div>
              <strong>Lauren Adams</strong>
              <p>Date of birth: 14 Oct 1990</p>
              <p>Email: lauren.adams@example.com</p>
            </div>
          </div>
          <button type="button" className="account-button">Change Password</button>
        </section>

        <section className="account-card">
          <div className="account-card__header">
            <div>
              <h2 className="account-card__title">Contact Information</h2>
              <p className="account-card__description">
                Let us know where to reach you with prize notifications and updates.
              </p>
            </div>
          </div>
          <form
            className="account-section__fields account-section__fields--two-column"
            onSubmit={handleContactSubmit}
          >
            <label htmlFor="contact-address">
              Street Address
              <input
                id="contact-address"
                name="address"
                type="text"
                value={contactInfo.address}
                onChange={handleFieldChange}
              />
            </label>
            <label htmlFor="contact-city">
              City
              <input
                id="contact-city"
                name="city"
                type="text"
                value={contactInfo.city}
                onChange={handleFieldChange}
              />
            </label>
            <label htmlFor="contact-postal">
              Postal Code
              <input
                id="contact-postal"
                name="postalCode"
                type="text"
                value={contactInfo.postalCode}
                onChange={handleFieldChange}
              />
            </label>
            <label htmlFor="contact-country">
              Country
              <input
                id="contact-country"
                name="country"
                type="text"
                value={contactInfo.country}
                onChange={handleFieldChange}
              />
            </label>
            <label htmlFor="contact-state">
              State / Region
              <input
                id="contact-state"
                name="state"
                type="text"
                value={contactInfo.state}
                onChange={handleFieldChange}
              />
            </label>
            <label htmlFor="contact-phone">
              Mobile Number
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                value={contactInfo.phone}
                onChange={handleFieldChange}
              />
            </label>
            <button
              type="submit"
              className="account-button"
              style={{ gridColumn: "span 12" }}
            >
              Update contact details
            </button>
          </form>
        </section>
      </div>

      <section className="account-card" style={{ marginTop: "1.5rem" }}>
        <div className="account-card__header">
          <div>
            <h2 className="account-card__title">Notifications</h2>
            <p className="account-card__description">
              Choose how you prefer to hear from Lotto247 about draws and special offers.
            </p>
          </div>
        </div>
        <form onSubmit={handleNotificationsSubmit} className="account-section">
          <label className="account-notification" htmlFor="marketing-opt-in">
            <input
              id="marketing-opt-in"
              type="checkbox"
              checked={marketingOptIn}
              onChange={(event) => setMarketingOptIn(event.target.checked)}
            />
            Marketing related emails
          </label>
          <button type="submit" className="account-button">Update preferences</button>
        </form>
      </section>
    </div>
  );
}

export default Profile;
