import React, {CSSProperties, MutableRefObject, ReactNode, useImperativeHandle} from 'react';

interface formProps{
    onSubmit?(event: React.FormEvent<HTMLFormElement>):void,
    children: ReactNode
    childRef?: MutableRefObject<{ validate(): void } | undefined>
    style?: CSSProperties
}

export default React.forwardRef<HTMLFormElement, formProps>(function Form(props:formProps, $form) {
    useImperativeHandle(
        props.childRef,
        () => ({
            validate: () => {
                return validateForm().verror;
            }
        }),
        [],
    );

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        const {verror, el} = validateForm();
        if (!verror) {
            props.onSubmit && props.onSubmit(event);
        } else if(el) {
            el.scrollIntoView({block:"center"});
        }
        event.preventDefault();
    }

    function validateForm() {
        let verror = false;
        let el: HTMLInputElement | undefined;
        if ($form && typeof  $form !== "function") {
            $form && Array.from($form.current!.elements).forEach((item:any) => {
                if (item.getAttribute("verror") || item.dataset.verror) {
                    item.classList.add("error");
                    verror = true;
                    if (!el) {
                        el = item;
                    }
                }
            });
        }
        return {verror, el};
    }

    return (
        <form ref={$form} autoComplete={"off"} onSubmit={handleSubmit} style={props.style}>
            {props.children}
        </form>
    )
})
