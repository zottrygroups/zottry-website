import React, { useState } from "react";
import Modal from "../ui/Modal";

function BuyTicketButton({ lotteryName }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" className="lottery-cta" onClick={() => setOpen(true)}>
        Buy Ticket
      </button>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Ticket purchase coming soon"
        description={`You're almost there! Ticket sales for ${lotteryName} will be available shortly.`}
        footer={(
          <button type="button" className="account-button" onClick={() => setOpen(false)}>
            Okay
          </button>
        )}
      >
        <p style={{ margin: 0 }}>
          Keep an eye on your inbox — we will notify you the moment tickets are ready. In the
          meantime, you can explore other Zottry draws or set spending limits from your profile.
        </p>
      </Modal>
    </>
  );
}

export default BuyTicketButton;
