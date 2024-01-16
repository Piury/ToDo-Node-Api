function validateObject(obj: any, validationRules: any): boolean {
    try {
        for (const [key, value] of Object.entries(obj)) {
            if (!validationRules[key]) {
                throw new Error(`Unexpected property: ${key}`);
            }

            const rule = validationRules[key];

            // Validar la presencia si es requerida
            if (rule.required && value === undefined) {
                throw new Error(`Missing required property: ${key}`);
            }

            // Validar el tipo de dato
            if (typeof value !== rule.type) {
                throw new Error(`Invalid type for property ${key}: expected ${rule.type}, got ${typeof value}`);
            }

            // Validaciones adicionales según la regla
            if (rule.minLength && typeof value === "string" && value.length < rule.minLength) {
                throw new Error(`Property ${key} must be at least ${rule.minLength} characters long`);
            }

            if (rule.after && rule.type === "date" && value <= rule.after) {
                throw new Error(`Property ${key} must be after ${rule.after.toISOString()}`);
            }

            if (rule.range && rule.type === "number" && !rule.range.includes(value)) {
                throw new Error(`Property ${key} must be within the range ${rule.range[0]}-${rule.range[1]}`);
            }
        }

        return true; // Si no se arrojan errores, el objeto es válido
    } catch (error) {
        console.error("Validation error:", error.message);
        return false;
    }
}