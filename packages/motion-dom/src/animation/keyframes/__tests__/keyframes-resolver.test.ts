import { KeyframeResolver } from "../KeyframesResolver"

describe("KeyframeResolver", () => {
    test("uses the resolved final keyframe when start keyframe is a wildcard", () => {
        const readValue = jest.fn(() => undefined)
        const onComplete = jest.fn()

        const resolver = new KeyframeResolver<number>(
            [null as any, null as any],
            (resolvedKeyframes) => {
                expect(resolvedKeyframes).toEqual([300, 300])
                onComplete()
            },
            "x",
            undefined,
            { readValue } as any
        )

        resolver.finalKeyframe = 300
        resolver.scheduleResolve()

        expect(onComplete).toHaveBeenCalledTimes(1)
        expect(readValue).toHaveBeenCalledWith("x", 300)
    })
})
