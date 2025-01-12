import { useState } from 'react';

const BasicSystemForm = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', { name, email, message });
    };

    return (
        <>
            <h1>Basic System Form</h1>
            <form onSubmit={handleSubmit}>
                <p>PIC:</p>
                <input type="text" placeholder="Person in charge"/>
                <button type="submit">Submit</button>
            </form>
        </>
    );
};

export default BasicSystemForm;
