import { describe, it, expect, vi } from "vitest";
import { translateObject } from "../src/translations-manager";
import translate from "google-translate-api-x";

vi.mock("google-translate-api-x");

describe("translateObject", () => {
    it("translates all string values in a flat object", async () => {
        translate.mockResolvedValue({ text: "Bonjour" });
        const obj = { greeting: "Hello" };
        const result = await translateObject({ obj, fromLang: "en", toLang: "fr" });
        expect(result).toEqual({ greeting: "Bonjour" });
    });

    it("translates nested objects", async () => {
        translate.mockResolvedValueOnce({ text: "Bonjour" }).mockResolvedValueOnce({ text: "Monde" });
        const obj = { greeting: "Hello", nested: { world: "World" } };
        const result = await translateObject({ obj, fromLang: "en", toLang: "fr" });
        expect(result).toEqual({ greeting: "Bonjour", nested: { world: "Monde" } });
    });

    it("does not overwrite existing translations unless replace is true", async () => {
        translate.mockResolvedValue({ text: "Bonjour" });
        const obj = { greeting: "Hello" };
        const translated = { greeting: "Hola" };
        const result = await translateObject({ obj, translated, fromLang: "en", toLang: "fr" });
        expect(result).toEqual({ greeting: "Hola" });

        const resultWithReplace = await translateObject({ obj, translated, fromLang: "en", toLang: "fr", replace: true });
        expect(resultWithReplace).toEqual({ greeting: "Bonjour" });
    });

    it("handles translation errors gracefully", async () => {
        translate.mockRejectedValue(new Error("Translation failed"));
        const obj = { greeting: "Hello" };
        const result = await translateObject({ obj, fromLang: "en", toLang: "fr" });
        expect(result).toEqual({ greeting: "Hello" });
    });
});
