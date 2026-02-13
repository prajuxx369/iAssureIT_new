import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { trackFormStart, trackFormSubmitSuccess, trackFormSubmitFail } from '../lib/analytics';

export default function LeadForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const onSubmit = async (data) => {
        setSubmitting(true);
        setError(null);
        trackFormStart();

        try {
            const response = await fetch('/api/submitLead', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                trackFormSubmitSuccess();
                // Handle successful submission (e.g., show a success message)
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Something went wrong.');
                trackFormSubmitFail();
            }
        } catch (error) {
            setError('Something went wrong.');
            trackFormSubmitFail();
        }

        setSubmitting(false);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* ... form fields for name, business name, email, mobile, city, country, comments ... */}
            <button type="submit" disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit'}
            </button>
            {error && <p>{error}</p>}
        </form>
    );
}