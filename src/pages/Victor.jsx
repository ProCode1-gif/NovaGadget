import { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const Victor = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Modal</button>
      <div className="h-screen w-screen flex justify-center align-middle items-center">
        <Modal
          className="bg-white/60 shadow w-[20%] rounded-lg absolute"
          isOpen={open}
          onRequestClose={() => setOpen(false)}
        >
          <h1 className="text-center font-bold text-green-600">Hello</h1>
          <button onClick={() => setOpen(false)}>Close</button>
        </Modal>
      </div>
    </>
  );
};

export default Victor;
