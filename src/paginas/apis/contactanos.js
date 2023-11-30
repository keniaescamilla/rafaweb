import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';


const Contacto = () => {
    const form = useRef();

    const sendEmail = async (e) => {
        e.preventDefault();

        try {
            const result = await emailjs.sendForm(
                'service_gak94aa',
                'template_f4ixvi8',
                form.current,
                'F1NQNTWslW1XX0Bdc'
            );

            console.log(result.text);

            // Limpiar el formulario después de enviar el correo
            form.current.reset();
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };

    return (
        <form ref={form} onSubmit={sendEmail}>
            <label>Name</label>
            <input type="text" name="user_name" />
            <label>Email</label>
            <input type="email" name="user_email" />
            <label >Message</label>
            <textarea name="message" />
            <input type="submit" value="Send" />
        </form>
    );
}

export default Contacto;