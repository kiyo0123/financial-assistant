import {useState} from 'react';

export default function WidgetPage() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [feedbackText, setFeedbackText] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const openModal = () => {
        setFeedbackText('');
        setError(null);
        setSuccess(false);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const sendFeedback = async () => {
        if (!feedbackText.trim()) {
            setError('Feedback cannot be empty.');
            return;
        }
        setIsSending(true);
        setError(null);
        try {
            const resp = await fetch(
                'https://93w8h6xxv09h7s9ibx-dev-yossi1.us-east-1.aws.squid.cloud/webhooks/provideFeedback',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({feedback: feedbackText}),
                }
            );
            if (!resp.ok) {
                throw new Error(`Server responded ${resp.status}`);
            }
            setSuccess(true);
            // Optionally auto-close after a delay:
            setTimeout(() => {
                setModalOpen(false);
            }, 1500);
        } catch (err) {
            setError('Failed to send feedback. Please try again.');
            console.error(err);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="container flex-shrink-0" style={{height: 'calc(100% - 204px)'}}>
            <squid-chat-widget
                id="squid_chat_widget"
                className="squid_chat_widget h-[500px]"
                header-title="Fujifilm"
                intro-text="How may I help you?"
                squid-app-id={import.meta.env.VITE_APP_ID}
                squid-region={import.meta.env.VITE_REGION}
                squid-environment-id={import.meta.env.VITE_ENVIRONMENT_ID}
                squid-api-key={import.meta.env.VITE_SQUID_API_KEY}
                squid-developer-id={import.meta.env.VITE_SQUID_DEVELOPER_ID}
                widget-width="100%"
                squid-ai-custom-api-url={import.meta.env.VITE_WIDGET_CUSTOM_API_URL}
                powered-by-text="Powered by Fujifilm"
            ></squid-chat-widget>

            {/* Feedback Button */}
            <div className="mt-4 text-center">
                <button
                    onClick={openModal}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    Send Feedback
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6">
                        <h2 className="text-xl font-semibold mb-4">Send Feedback</h2>
                        <textarea
                            value={feedbackText}
                            onChange={(e) => setFeedbackText(e.target.value)}
                            rows={5}
                            className="w-full border rounded p-2 mb-3 focus:outline-none focus:ring text-bg1"
                            placeholder="Your feedback..."
                        />

                        {error && <p className="text-sm text-red-600 mb-2">{error}</p>}
                        {success && <p className="text-sm text-green-600 mb-2">Feedback sent!</p>}

                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={closeModal}
                                disabled={isSending}
                                className=" px-4 py-2 rounded bg-[var(--bg1)] text-[var(--text1)] hover:opacity-90"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={sendFeedback}
                                disabled={isSending || success}
                                className=" px-4 py-2 rounded bg-[var(--bg1)] text-[var(--text1)] hover:opacity-90"
                            >
                                {isSending ? 'Sending…' : 'Send'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
