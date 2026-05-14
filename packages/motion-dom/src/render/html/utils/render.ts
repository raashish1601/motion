import type { MotionStyle } from "../../VisualElement"
import type { IProjectionNode } from "../../../projection/node/types"
import { HTMLRenderState } from "../types"

export function renderHTML(
    element: HTMLElement,
    { style, vars, children }: HTMLRenderState,
    styleProp?: MotionStyle,
    projection?: IProjectionNode
): void {
    const elementStyle = element.style

    let key: string
    for (key in style) {
        // CSSStyleDeclaration has [index: number]: string; in the types, so we use that as key type.
        elementStyle[key as unknown as number] = style[key] as string
    }

    // Write projection styles directly to element style
    projection?.applyProjectionStyles(elementStyle, styleProp)

    for (key in vars) {
        // Loop over any CSS variables and assign those.
        // They can only be assigned using `setProperty`.
        elementStyle.setProperty(key, vars[key] as string)
    }

    if (children !== undefined) {
        element.textContent = `${children}`
    }
}
