export const validation = (value, inputId) => {
    const patterns = {
        username: /^[a-zA-Z]+$/,
        phoneNumber: /^[0-9\s+-.,:;x_]+$/
    }
    return patterns[inputId].test(value);
}