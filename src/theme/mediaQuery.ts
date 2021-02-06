const customMediaQuery = (maxWidth: number) => `@media (max-width: ${maxWidth}px)`;

const mediaQuery = {
    custom: customMediaQuery,
    desktop: customMediaQuery(922),
    tablet: customMediaQuery(768),
    phone: customMediaQuery(576),
};

export default mediaQuery;
