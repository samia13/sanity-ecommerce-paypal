import React, { useEffect } from "react";
import Link from "next/link";
import { runFireworks } from "../lib/confetti";

const Success = () => {
  useEffect(() => {
    runFireworks();
  }, []);
  return (
    <section className='success'>
      <div className='container'>
        <div className='notification'>
          <h2>Thank you for your Purchase</h2>
          <p>For more details contact us at johndoe@mail.com</p>
          <div className='buttons'>
            <Link href='/'>
              <a className='btn-secondary'>Back to Home</a>
            </Link>
            <Link href='/#categories'>
              <a className='btn-primary'>See more products</a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Success;
