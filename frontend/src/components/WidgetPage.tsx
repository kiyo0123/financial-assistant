import {useRef} from 'react';

export default function WidgetPage() {
    const widgetRef = useRef<any>(null);

    const suggestedQuestions = [
        "昨年の売上を部門別に教えてください",
        "先月の利益は前年同期と比べてどうでしたか？",
        "ヨーロッパの売上を教えて下さい"
    ];


    const handleQuestionClick = (question: string) => {
        // チャットウィジェットの入力フィールドを取得して質問を設定
        if (widgetRef.current) {
            // shadow DOM内の入力フィールドを探す
            const shadowRoot = widgetRef.current.shadowRoot;
            if (shadowRoot) {
                const inputField = shadowRoot.querySelector('input[type="text"], textarea, [contenteditable]');
                if (inputField) {
                    // 入力フィールドに質問を設定
                    if (inputField.tagName === 'INPUT' || inputField.tagName === 'TEXTAREA') {
                        inputField.value = question;
                        // 入力イベントを発火
                        inputField.dispatchEvent(new Event('input', { bubbles: true }));
                        inputField.dispatchEvent(new Event('change', { bubbles: true }));
                    } else if (inputField.hasAttribute('contenteditable')) {
                        inputField.textContent = question;
                        // contenteditable要素用のイベント
                        inputField.dispatchEvent(new Event('input', { bubbles: true }));
                    }
                    
                    // フォーカスを当てる
                    inputField.focus();
                    
                    // Enterキーを自動で押すか送信ボタンをクリック
                    setTimeout(() => {
                        const sendButton = shadowRoot.querySelector('button[type="submit"], button:contains("送信"), button:contains("Send")');
                        if (sendButton) {
                            sendButton.click();
                        } else {
                            // Enterキーイベントを発火
                            inputField.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
                        }
                    }, 100);
                }
            } else {
                // shadow DOMがない場合、通常のDOM要素を探す
                const inputField = widgetRef.current.querySelector('input[type="text"], textarea, [contenteditable]');
                if (inputField) {
                    if (inputField.tagName === 'INPUT' || inputField.tagName === 'TEXTAREA') {
                        inputField.value = question;
                        inputField.dispatchEvent(new Event('input', { bubbles: true }));
                        inputField.dispatchEvent(new Event('change', { bubbles: true }));
                    } else if (inputField.hasAttribute('contenteditable')) {
                        inputField.textContent = question;
                        inputField.dispatchEvent(new Event('input', { bubbles: true }));
                    }
                    inputField.focus();
                    
                    setTimeout(() => {
                        const sendButton = widgetRef.current.querySelector('button[type="submit"], button:contains("送信"), button:contains("Send")');
                        if (sendButton) {
                            sendButton.click();
                        } else {
                            inputField.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
                        }
                    }, 100);
                }
            }
        }
    };


    return (
        <div className="container flex-shrink-0 flex flex-col h-full" style={{height: 'calc(100vh - 204px)'}}>
            {/* チャットウィジェット: 80% */}
            <div className="flex-[8] mb-4">
                <squid-chat-widget
                    ref={widgetRef}
                    id="squid_chat_widget"
                    className="squid_chat_widget w-full h-full"
                    header-title="財務 AIエージェント（Financial AI Agent）"
                    intro-text="こんにちは。今日はどんなお手伝いをしましょうか？"
                    squid-app-id={import.meta.env.VITE_APP_ID}
                    squid-region={import.meta.env.VITE_REGION}
                    squid-environment-id={import.meta.env.VITE_ENVIRONMENT_ID}
                    squid-api-key={import.meta.env.VITE_SQUID_API_KEY}
                    squid-developer-id={import.meta.env.VITE_SQUID_DEVELOPER_ID}
                    widget-width="100%"
                    squid-ai-custom-api-url={import.meta.env.VITE_WIDGET_CUSTOM_API_URL}
                    powered-by-text="Powered by Squid AI"
                ></squid-chat-widget>
            </div>

            {/* 候補質問ボタン: 20% */}
            <div className="flex-[2] mb-4">
                <h3 className="text-sm font-medium text-gray-600 mb-2">よく使われる質問:</h3>
                <div className="flex flex-col gap-2 h-full overflow-y-auto">
                    {suggestedQuestions.map((question, index) => (
                        <button
                            key={index}
                            onClick={() => handleQuestionClick(question)}
                            className="text-left p-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg text-sm text-blue-700 transition-colors duration-200 flex-shrink-0"
                        >
                            {question}
                        </button>
                    ))}
                </div>
            </div>

        </div>
    );
}
