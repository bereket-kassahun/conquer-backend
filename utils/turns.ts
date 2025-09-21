export function nextTurn(current: number) {
    switch (true) {
        case (current < 4 && current > 0): 
            return current + 1; 
        default: return 1; 
    }
};