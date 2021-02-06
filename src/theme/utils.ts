export function parseColor(color: string): [number, number, number, number] {
    let m: RegExpMatchArray | null = color.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i);
    if (m) {
        const [, r, g, b] = m;
        return [parseInt(r, 16) * 0x11, parseInt(g, 16) * 0x11, parseInt(b, 16) * 0x11, 1];
    }
    m = color.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
    if (m) {
        const [, r, g, b] = m;
        return [parseInt(r, 16), parseInt(g, 16), parseInt(b, 16), 1];
    }

    m = color.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
    if (m) {
        const [, r, g, b] = m;
        return [parseInt(r), parseInt(g), parseInt(b), 1];
    }
    m = color.match(/^rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+(\.\d+)?)\s*\)$/i);
    if (m) {
        const [, r, g, b, a] = m;
        return [parseInt(r), parseInt(g), parseInt(b), parseFloat(a)];
    }
    return [0, 0, 0, 0];
}

export function rgba(color: string, alpha: number): string {
    const [r, g, b, a] = parseColor(color);
    return `rgba(${r},${g},${b},${(a * alpha).toFixed(2)})`;
}
