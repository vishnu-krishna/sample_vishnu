import { Inject, Injectable } from '@angular/core';
import { DOCUMENT }           from '@angular/common';

@Injectable()
export class DocumentService {
    constructor(@Inject(DOCUMENT) private _dom) { }

    public querySelector(el: any, selector: string): HTMLElement | null {
        return this._dom.querySelector(selector);
    }

    public setStyle(element: any, styleName: string, styleValue: string): void {
        if (!element) { return; }
        return element.setAttribute('style', `${styleName}: ${styleValue}`);
    }

    public removeAttribute(element: any, attribute: string): void {
        if (!element) { return; }
        return element.removeAttribute(attribute);
    }

    public getElementById(elementId: string): HTMLElement | null {
        return this._dom.getElementById(elementId);
    }

    /**
     * Can be used to determine if the whole SPA is being (re)loaded or a deep link is being loaded for the first time
     */
    public isReadyStateComplete(): boolean {
        return this._dom.readyState === 'complete';
    }

    public get URL(): string {
        return this._dom.URL;
    }

//   public parse(templateHtml: string): void {};
// public hasProperty(element: any, name: string): boolean;
// public setProperty(el: any, name: string, value: any): void;
// public getProperty(el: any, name: string): any;
// public invoke(el: any, methodName: string, args: any[]): any;
// public logError(error: any): void;
// public log(error: any): void;
// public logGroup(error: any): void;
// public logGroupEnd(): void;
// public query(selector: string): any;
// public querySelector(el: any, selector: string): HTMLElement;
// public querySelectorAll(el: any, selector: string): any[];
// public on(el: any, evt: any, listener: any): void;
// public onAndCancel(el: any, evt: any, listener: any): Function;
// public dispatchEvent(el: any, evt: any): void;
// public createMouseEvent(eventType: string): MouseEvent;
// public createEvent(eventType: any): Event;
// public preventDefault(evt: Event): void;
// public isPrevented(evt: Event): boolean;
// public getInnerHTML(el: any): string;
// public getTemplateContent(el: any): Node;
// public getOuterHTML(el: any): string;
// public nodeName(node: Node): string;
// public nodeValue(node: Node): string;
// public type(node: HTMLInputElement): string;
// public content(node: Node): Node;
// public firstChild(el: any): Node;
// public nextSibling(el: any): Node;
// public parentElement(el: any): Node;
// public childNodes(el: any): Node[];
// public childNodesAsList(el: any): any[];
// public clearNodes(el: any): void;
// public appendChild(el: any, node: any): void;
// public removeChild(el: any, node: any): void;
// public replaceChild(el: Node, newChild: any, oldChild: any): void;
// public remove(node: any): Node;
// public insertBefore(el: any, node: any): void;
// public insertAllBefore(el: any, nodes: any): void;
// public insertAfter(el: any, node: any): void;
// public setInnerHTML(el: any, value: any): void;
// public getText(el: any): string;
// public setText(el: any, value: string): void;
// public getValue(el: any): string;
// public setValue(el: any, value: string): void;
// public getChecked(el: any): boolean;
// public setChecked(el: any, value: boolean): void;
// public createComment(text: string): Comment;
// public createTemplate(html: any): HTMLElement;
// public createElement(tagName: any, doc?: Document): HTMLElement;
// public createElementNS(ns: any, tagName: any, doc?: Document): Element;
// public createTextNode(text: string, doc?: Document): Text;
// public createScriptTag(attrName: string, attrValue: string, doc?: Document): HTMLScriptElement;
// public createStyleElement(css: string, doc?: Document): HTMLStyleElement;
// public createShadowRoot(el: HTMLElement): DocumentFragment;
// public getShadowRoot(el: HTMLElement): DocumentFragment;
// public getHost(el: HTMLElement): HTMLElement;
// public clone(node: Node): Node;
// public getElementsByClassName(element: any, name: string): HTMLElement[];
// public getElementsByTagName(element: any, name: string): HTMLElement[];
// public classList(element: any): any[];
// public addClass(element: any, className: string): void;
// public removeClass(element: any, className: string): void;
// public hasClass(element: any, className: string): boolean;
// public setStyle(element: any, styleName: string, styleValue: string): void;
// public removeStyle(element: any, stylename: string): void;
// public getStyle(element: any, stylename: string): string;
// public hasStyle(element: any, styleName: string, styleValue?: string): boolean;
// public tagName(element: any): string;
// public attributeMap(element: any): Map<string, string>;
// public hasAttribute(element: any, attribute: string): boolean;
// public hasAttributeNS(element: any, ns: string, attribute: string): boolean;
// public getAttribute(element: any, attribute: string): string;
// public getAttributeNS(element: any, ns: string, name: string): string;
// public setAttribute(element: any, name: string, value: string): void;
// public setAttributeNS(element: any, ns: string, name: string, value: string): void;
// public removeAttribute(element: any, attribute: string): void;
// public removeAttributeNS(element: any, ns: string, name: string): void;
// public templateAwareRoot(el: any): any;
// public createHtmlDocument(): HTMLDocument;
// public defaultDoc(): HTMLDocument;
// public getBoundingClientRect(el: any): any;
// public getTitle(): string;
// public setTitle(newTitle: string): void;
// public elementMatches(n: any, selector: string): boolean;
// public isTemplateElement(el: any): boolean;
// public isTextNode(node: Node): boolean;
// public isCommentNode(node: Node): boolean;
// public isElementNode(node: Node): boolean;
// public hasShadowRoot(node: any): boolean;
// public isShadowRoot(node: any): boolean;
// public importIntoDoc(node: Node): any;
// public adoptNode(node: Node): any;
// public getHref(el: Element): string;
// public getEventKey(event: any): string;
// public getGlobalEventTarget(target: string): EventTarget;
// public getHistory(): History;
// public getLocation(): Location;
// public getBaseHref(): string;
// public resetBaseElement(): void;
// public getUserAgent(): string;
// public setData(element: any, name: string, value: string): void;
// public getData(element: any, name: string): string;
// public getComputedStyle(element: any): any;
// public setGlobalVar(path: string, value: any): void;
// public supportsWebAnimation(): boolean;
// public performanceNow(): number;
// public supportsCookies(): boolean;
// public getCookie(name: string): string;
// public setCookie(name: string, value: string): void;

}
