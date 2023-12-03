import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const Contacto = () => {
    const form = useRef();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalColor, setModalColor] = useState('#29CA4B'); // Verde por defecto

    const validateForm = () => {
        // Aquí agregas tu lógica de validación, por ejemplo:
        const name = form.current['user_name'].value;
        const email = form.current['user_email'].value;
        const message = form.current['message'].value;

        if (!name || !email || !message) {
            return false;
        }

        return true;
    };

    const sendEmail = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            setModalMessage('Datos ingresados incorrectamente.');
            setModalColor('#FF5733'); // Rojo para error
            setModalVisible(true);
            return;
        }

        try {
            const result = await emailjs.sendForm(
                'service_gak94aa',
                'template_f4ixvi8',
                form.current,
                'F1NQNTWslW1XX0Bdc'
            );
            console.log(result.text);
            setModalMessage('¡Enviado exitosamente!');
            setModalColor('#29CA4B'); // Verde para éxito
            setModalVisible(true);
            form.current.reset();
        } catch (error) {
            console.error('Error sending email:', error);
            setModalMessage('Error al enviar. Por favor, intenta de nuevo.');
            setModalColor('#FF5733'); // Rojo para error
            setModalVisible(true);
        }
    };

    // Estilos en el mismo archivo
    const styles = {
        formStyle: {
            width: '50%',
            margin: '0 auto'
        },
        inputStyle: {
            width: '100%',
            boxSizing: 'border-box'
        },
        modalStyle: (color) => ({
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: color,
            padding: '20px',
            borderRadius: '10px'
        })
    };

    return (
        <div>
            <form ref={form} onSubmit={sendEmail} style={styles.formStyle}>
                <label>Name</label>
                <input type="text" name="user_name" style={styles.inputStyle} />
                <label>Email</label>
                <input type="email" name="user_email" style={styles.inputStyle} />
                <label>Message</label>
                <textarea name="message" style={styles.inputStyle} />
                <input type="submit" value="Send" />
            </form>

            {modalVisible && (
                <div style={styles.modalStyle(modalColor)}>
                    <p>{modalMessage}</p>
                    <button onClick={() => setModalVisible(false)}>Cerrar</button>
                </div>
            )}
        </div>
    );
}

export default Contacto;
