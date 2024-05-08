type Timer = ReturnType<typeof setTimeout>;

export function debounce(func: Function, delay: number): { invoke: Function; cancel: Function } {
    let timer: Timer | null = null;

    function invoke(...args: any[]) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            func(...args);
            timer = null;
        }, delay);
    }

    function cancel() {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
    }

    return { invoke, cancel };
}