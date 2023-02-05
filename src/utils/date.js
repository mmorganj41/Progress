export const readableDateString = (date) => {
        return date.toLocaleDateString('en-US', 
            {weekday: 'long',
            year: "numeric",
            month: "long",
            day: "numeric",});
}

