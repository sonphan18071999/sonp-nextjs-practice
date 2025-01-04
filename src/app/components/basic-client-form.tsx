import {useEffect, useState} from 'react';
import {useRole} from "@/app/contexts/RoleContext";
import {hasDownloadRight, hasReadOnlyRight} from "@/app/ultilies/permissionUtils";
import FeatureAccess from "@/app/components/FeatureAccess";
import {Features} from "@/app/models/permission";

const BasicClientForm = () => {
    const {role} = useRole();
    const [readOnly, setReadOnly] = useState(false);
    useEffect(() => {
        setReadOnly(hasReadOnlyRight(role))
    }, [role])

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', {name, email, message});
    };

    return (
        <div>
            <h1>Client Form</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <p>Name:</p>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value=""
                        onChange={(e) => setName(e.target.value)}
                        required
                        disabled={readOnly}
                    />
                </div>

                <div>
                    <p>Email:</p>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={readOnly}
                    />
                </div>

                <div>
                    <p>Message:</p>

                    <textarea
                        id="message"
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        disabled={readOnly}
                    />
                </div>

                <button type="submit" disabled={readOnly}>Submit</button>
                <FeatureAccess feature={Features.DOWNLOAD}>
                        <button>Download file</button>
                </FeatureAccess>
            </form>
        </div>
    );
};

export default BasicClientForm;
