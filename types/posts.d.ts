// To parse this data:
//
//   import { Convert } from "./file";
//
//   const postsD = Convert.toPostsD(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface PostsD {
    id:              number;
    date:            Date;
    date_gmt:        Date;
    guid:            GUID;
    modified:        Date;
    modified_gmt:    Date;
    slug:            string;
    status:          Status;
    type:            PostsDType;
    link:            string;
    title:           GUID;
    content:         Content;
    excerpt:         Content;
    author:          number;
    featured_media:  number;
    comment_status:  CommentStatus;
    ping_status:     PingStatus;
    sticky:          boolean;
    template:        string;
    format:          Format;
    meta:            any[];
    categories:      number[];
    tags:            any[];
    acf:             any[];
    yoast_head:      string;
    yoast_head_json: YoastHeadJSON;
    _links:          Links;
}

export interface Links {
    self:                   About[];
    collection:             About[];
    about:                  About[];
    author:                 AuthorElement[];
    replies:                AuthorElement[];
    "version-history":      VersionHistory[];
    "predecessor-version"?: PredecessorVersion[];
    "wp:featuredmedia":     AuthorElement[];
    "wp:attachment":        About[];
    "wp:term":              WpTerm[];
    curies:                 Cury[];
}

export interface About {
    href: string;
}

export interface AuthorElement {
    embeddable: boolean;
    href:       string;
}

export interface Cury {
    name:      Name;
    href:      Href;
    templated: boolean;
}

export enum Href {
    HTTPSAPIWOrgRel = "https://api.w.org/{rel}",
}

export enum Name {
    Wp = "wp",
}

export interface PredecessorVersion {
    id:   number;
    href: string;
}

export interface VersionHistory {
    count: number;
    href:  string;
}

export interface WpTerm {
    taxonomy:   Taxonomy;
    embeddable: boolean;
    href:       string;
}

export enum Taxonomy {
    Category = "category",
    PostTag = "post_tag",
}

export enum CommentStatus {
    Open = "open",
}

export interface Content {
    rendered:  string;
    protected: boolean;
}

export enum Format {
    Standard = "standard",
}

export interface GUID {
    rendered: string;
}

export enum PingStatus {
    Closed = "closed",
}

export enum Status {
    Publish = "publish",
}

export enum PostsDType {
    Post = "post",
}

export interface YoastHeadJSON {
    title:                  string;
    robots:                 Robots;
    canonical:              string;
    og_locale:              OgLocale;
    og_type:                OgType;
    og_title:               string;
    og_description:         string;
    og_url:                 string;
    og_site_name:           OgSiteName;
    article_publisher:      string;
    article_author:         string;
    article_published_time: Date;
    article_modified_time?: Date;
    og_image:               OgImage[];
    author:                 AuthorEnum;
    twitter_card:           TwitterCard;
    twitter_creator:        TwitterCreator;
    twitter_site:           TwitterSite;
    schema:                 Schema;
    description?:           string;
}

export enum AuthorEnum {
    PiotrSz = "Piotr Sz.",
}

export interface OgImage {
    width:  number;
    height: number;
    url:    string;
    type:   OgImageType;
}

export enum OgImageType {
    ImageJPEG = "image/jpeg",
    ImagePNG = "image/png",
    ImageWebp = "image/webp",
}

export enum OgLocale {
    EnGB = "en_GB",
}

export enum OgSiteName {
    BumperBallExperiences = "Bumper Ball | Experiences",
}

export enum OgType {
    Article = "article",
}

export interface Robots {
    index:               Index;
    follow:              Follow;
    "max-snippet":       MaxSnippet;
    "max-image-preview": MaxImagePreview;
    "max-video-preview": MaxVideoPreview;
}

export enum Follow {
    Follow = "follow",
}

export enum Index {
    Index = "index",
}

export enum MaxImagePreview {
    MaxImagePreviewLarge = "max-image-preview:large",
}

export enum MaxSnippet {
    MaxSnippet1 = "max-snippet:-1",
}

export enum MaxVideoPreview {
    MaxVideoPreview1 = "max-video-preview:-1",
}

export interface Schema {
    "@context": string;
    "@graph":   Graph[];
}

export interface Graph {
    "@type":          GraphType;
    "@id":            string;
    url?:             string;
    name?:            string;
    isPartOf?:        BreadcrumbClass;
    datePublished?:   Date;
    dateModified?:    Date;
    author?:          BreadcrumbClass;
    breadcrumb?:      BreadcrumbClass;
    inLanguage?:      InLanguage;
    potentialAction?: PotentialAction[];
    itemListElement?: ItemListElement[];
    description?:     string;
    image?:           Image;
    sameAs?:          string[];
}

export enum GraphType {
    BreadcrumbList = "BreadcrumbList",
    Person = "Person",
    WebPage = "WebPage",
    WebSite = "WebSite",
}

export interface BreadcrumbClass {
    "@id": string;
}

export interface Image {
    "@type":    ImageType;
    inLanguage: InLanguage;
    "@id":      string;
    url:        string;
    contentUrl: string;
    caption:    AuthorEnum;
}

export enum ImageType {
    ImageObject = "ImageObject",
}

export enum InLanguage {
    EnGB = "en-GB",
}

export interface ItemListElement {
    "@type":  ItemListElementType;
    position: number;
    name:     string;
    item?:    string;
}

export enum ItemListElementType {
    ListItem = "ListItem",
}

export interface PotentialAction {
    "@type":        PotentialActionType;
    target:         string[] | TargetClass;
    "query-input"?: QueryInput;
}

export enum PotentialActionType {
    ReadAction = "ReadAction",
    SearchAction = "SearchAction",
}

export enum QueryInput {
    RequiredNameSearchTermString = "required name=search_term_string",
}

export interface TargetClass {
    "@type":     TargetType;
    urlTemplate: URLTemplate;
}

export enum TargetType {
    EntryPoint = "EntryPoint",
}

export enum URLTemplate {
    HTTPSBumperballPlSSearchTermString = "https://bumperball.pl/?s={search_term_string}",
}

export enum TwitterCard {
    SummaryLargeImage = "summary_large_image",
}

export enum TwitterCreator {
    PIOSzczesniak = "@pio_szczesniak",
}

export enum TwitterSite {
    BumperBall = "@Bumper_Ball",
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toPostsD(json: string): PostsD[] {
        return cast(JSON.parse(json), a(r("PostsD")));
    }

    public static postsDToJson(value: PostsD[]): string {
        return JSON.stringify(uncast(value, a(r("PostsD"))), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
    const prettyTyp = prettyTypeName(typ);
    const parentText = parent ? ` on ${parent}` : '';
    const keyText = key ? ` for key "${key}"` : '';
    throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}

function prettyTypeName(typ: any): string {
    if (Array.isArray(typ)) {
        if (typ.length === 2 && typ[0] === undefined) {
            return `an optional ${prettyTypeName(typ[1])}`;
        } else {
            return `one of [${typ.map(a => { return prettyTypeName(a); }).join(", ")}]`;
        }
    } else if (typeof typ === "object" && typ.literal !== undefined) {
        return typ.literal;
    } else {
        return typeof typ;
    }
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key, parent);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val, key, parent);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases.map(a => { return l(a); }), val, key, parent);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue(l("Date"), val, key, parent);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue(l(ref || "object"), val, key, parent);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, key, ref);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key, ref);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val, key, parent);
    }
    if (typ === false) return invalidValue(typ, val, key, parent);
    let ref: any = undefined;
    while (typeof typ === "object" && typ.ref !== undefined) {
        ref = typ.ref;
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val, key, parent);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
    return { literal: typ };
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "PostsD": o([
        { json: "id", js: "id", typ: 0 },
        { json: "date", js: "date", typ: Date },
        { json: "date_gmt", js: "date_gmt", typ: Date },
        { json: "guid", js: "guid", typ: r("GUID") },
        { json: "modified", js: "modified", typ: Date },
        { json: "modified_gmt", js: "modified_gmt", typ: Date },
        { json: "slug", js: "slug", typ: "" },
        { json: "status", js: "status", typ: r("Status") },
        { json: "type", js: "type", typ: r("PostsDType") },
        { json: "link", js: "link", typ: "" },
        { json: "title", js: "title", typ: r("GUID") },
        { json: "content", js: "content", typ: r("Content") },
        { json: "excerpt", js: "excerpt", typ: r("Content") },
        { json: "author", js: "author", typ: 0 },
        { json: "featured_media", js: "featured_media", typ: 0 },
        { json: "comment_status", js: "comment_status", typ: r("CommentStatus") },
        { json: "ping_status", js: "ping_status", typ: r("PingStatus") },
        { json: "sticky", js: "sticky", typ: true },
        { json: "template", js: "template", typ: "" },
        { json: "format", js: "format", typ: r("Format") },
        { json: "meta", js: "meta", typ: a("any") },
        { json: "categories", js: "categories", typ: a(0) },
        { json: "tags", js: "tags", typ: a("any") },
        { json: "acf", js: "acf", typ: a("any") },
        { json: "yoast_head", js: "yoast_head", typ: "" },
        { json: "yoast_head_json", js: "yoast_head_json", typ: r("YoastHeadJSON") },
        { json: "_links", js: "_links", typ: r("Links") },
    ], false),
    "Links": o([
        { json: "self", js: "self", typ: a(r("About")) },
        { json: "collection", js: "collection", typ: a(r("About")) },
        { json: "about", js: "about", typ: a(r("About")) },
        { json: "author", js: "author", typ: a(r("AuthorElement")) },
        { json: "replies", js: "replies", typ: a(r("AuthorElement")) },
        { json: "version-history", js: "version-history", typ: a(r("VersionHistory")) },
        { json: "predecessor-version", js: "predecessor-version", typ: u(undefined, a(r("PredecessorVersion"))) },
        { json: "wp:featuredmedia", js: "wp:featuredmedia", typ: a(r("AuthorElement")) },
        { json: "wp:attachment", js: "wp:attachment", typ: a(r("About")) },
        { json: "wp:term", js: "wp:term", typ: a(r("WpTerm")) },
        { json: "curies", js: "curies", typ: a(r("Cury")) },
    ], false),
    "About": o([
        { json: "href", js: "href", typ: "" },
    ], false),
    "AuthorElement": o([
        { json: "embeddable", js: "embeddable", typ: true },
        { json: "href", js: "href", typ: "" },
    ], false),
    "Cury": o([
        { json: "name", js: "name", typ: r("Name") },
        { json: "href", js: "href", typ: r("Href") },
        { json: "templated", js: "templated", typ: true },
    ], false),
    "PredecessorVersion": o([
        { json: "id", js: "id", typ: 0 },
        { json: "href", js: "href", typ: "" },
    ], false),
    "VersionHistory": o([
        { json: "count", js: "count", typ: 0 },
        { json: "href", js: "href", typ: "" },
    ], false),
    "WpTerm": o([
        { json: "taxonomy", js: "taxonomy", typ: r("Taxonomy") },
        { json: "embeddable", js: "embeddable", typ: true },
        { json: "href", js: "href", typ: "" },
    ], false),
    "Content": o([
        { json: "rendered", js: "rendered", typ: "" },
        { json: "protected", js: "protected", typ: true },
    ], false),
    "GUID": o([
        { json: "rendered", js: "rendered", typ: "" },
    ], false),
    "YoastHeadJSON": o([
        { json: "title", js: "title", typ: "" },
        { json: "robots", js: "robots", typ: r("Robots") },
        { json: "canonical", js: "canonical", typ: "" },
        { json: "og_locale", js: "og_locale", typ: r("OgLocale") },
        { json: "og_type", js: "og_type", typ: r("OgType") },
        { json: "og_title", js: "og_title", typ: "" },
        { json: "og_description", js: "og_description", typ: "" },
        { json: "og_url", js: "og_url", typ: "" },
        { json: "og_site_name", js: "og_site_name", typ: r("OgSiteName") },
        { json: "article_publisher", js: "article_publisher", typ: "" },
        { json: "article_author", js: "article_author", typ: "" },
        { json: "article_published_time", js: "article_published_time", typ: Date },
        { json: "article_modified_time", js: "article_modified_time", typ: u(undefined, Date) },
        { json: "og_image", js: "og_image", typ: a(r("OgImage")) },
        { json: "author", js: "author", typ: r("AuthorEnum") },
        { json: "twitter_card", js: "twitter_card", typ: r("TwitterCard") },
        { json: "twitter_creator", js: "twitter_creator", typ: r("TwitterCreator") },
        { json: "twitter_site", js: "twitter_site", typ: r("TwitterSite") },
        { json: "schema", js: "schema", typ: r("Schema") },
        { json: "description", js: "description", typ: u(undefined, "") },
    ], false),
    "OgImage": o([
        { json: "width", js: "width", typ: 0 },
        { json: "height", js: "height", typ: 0 },
        { json: "url", js: "url", typ: "" },
        { json: "type", js: "type", typ: r("OgImageType") },
    ], false),
    "Robots": o([
        { json: "index", js: "index", typ: r("Index") },
        { json: "follow", js: "follow", typ: r("Follow") },
        { json: "max-snippet", js: "max-snippet", typ: r("MaxSnippet") },
        { json: "max-image-preview", js: "max-image-preview", typ: r("MaxImagePreview") },
        { json: "max-video-preview", js: "max-video-preview", typ: r("MaxVideoPreview") },
    ], false),
    "Schema": o([
        { json: "@context", js: "@context", typ: "" },
        { json: "@graph", js: "@graph", typ: a(r("Graph")) },
    ], false),
    "Graph": o([
        { json: "@type", js: "@type", typ: r("GraphType") },
        { json: "@id", js: "@id", typ: "" },
        { json: "url", js: "url", typ: u(undefined, "") },
        { json: "name", js: "name", typ: u(undefined, "") },
        { json: "isPartOf", js: "isPartOf", typ: u(undefined, r("BreadcrumbClass")) },
        { json: "datePublished", js: "datePublished", typ: u(undefined, Date) },
        { json: "dateModified", js: "dateModified", typ: u(undefined, Date) },
        { json: "author", js: "author", typ: u(undefined, r("BreadcrumbClass")) },
        { json: "breadcrumb", js: "breadcrumb", typ: u(undefined, r("BreadcrumbClass")) },
        { json: "inLanguage", js: "inLanguage", typ: u(undefined, r("InLanguage")) },
        { json: "potentialAction", js: "potentialAction", typ: u(undefined, a(r("PotentialAction"))) },
        { json: "itemListElement", js: "itemListElement", typ: u(undefined, a(r("ItemListElement"))) },
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "image", js: "image", typ: u(undefined, r("Image")) },
        { json: "sameAs", js: "sameAs", typ: u(undefined, a("")) },
    ], false),
    "BreadcrumbClass": o([
        { json: "@id", js: "@id", typ: "" },
    ], false),
    "Image": o([
        { json: "@type", js: "@type", typ: r("ImageType") },
        { json: "inLanguage", js: "inLanguage", typ: r("InLanguage") },
        { json: "@id", js: "@id", typ: "" },
        { json: "url", js: "url", typ: "" },
        { json: "contentUrl", js: "contentUrl", typ: "" },
        { json: "caption", js: "caption", typ: r("AuthorEnum") },
    ], false),
    "ItemListElement": o([
        { json: "@type", js: "@type", typ: r("ItemListElementType") },
        { json: "position", js: "position", typ: 0 },
        { json: "name", js: "name", typ: "" },
        { json: "item", js: "item", typ: u(undefined, "") },
    ], false),
    "PotentialAction": o([
        { json: "@type", js: "@type", typ: r("PotentialActionType") },
        { json: "target", js: "target", typ: u(a(""), r("TargetClass")) },
        { json: "query-input", js: "query-input", typ: u(undefined, r("QueryInput")) },
    ], false),
    "TargetClass": o([
        { json: "@type", js: "@type", typ: r("TargetType") },
        { json: "urlTemplate", js: "urlTemplate", typ: r("URLTemplate") },
    ], false),
    "Href": [
        "https://api.w.org/{rel}",
    ],
    "Name": [
        "wp",
    ],
    "Taxonomy": [
        "category",
        "post_tag",
    ],
    "CommentStatus": [
        "open",
    ],
    "Format": [
        "standard",
    ],
    "PingStatus": [
        "closed",
    ],
    "Status": [
        "publish",
    ],
    "PostsDType": [
        "post",
    ],
    "AuthorEnum": [
        "Piotr Sz.",
    ],
    "OgImageType": [
        "image/jpeg",
        "image/png",
        "image/webp",
    ],
    "OgLocale": [
        "en_GB",
    ],
    "OgSiteName": [
        "Bumper Ball | Experiences",
    ],
    "OgType": [
        "article",
    ],
    "Follow": [
        "follow",
    ],
    "Index": [
        "index",
    ],
    "MaxImagePreview": [
        "max-image-preview:large",
    ],
    "MaxSnippet": [
        "max-snippet:-1",
    ],
    "MaxVideoPreview": [
        "max-video-preview:-1",
    ],
    "GraphType": [
        "BreadcrumbList",
        "Person",
        "WebPage",
        "WebSite",
    ],
    "ImageType": [
        "ImageObject",
    ],
    "InLanguage": [
        "en-GB",
    ],
    "ItemListElementType": [
        "ListItem",
    ],
    "PotentialActionType": [
        "ReadAction",
        "SearchAction",
    ],
    "QueryInput": [
        "required name=search_term_string",
    ],
    "TargetType": [
        "EntryPoint",
    ],
    "URLTemplate": [
        "https://bumperball.pl/?s={search_term_string}",
    ],
    "TwitterCard": [
        "summary_large_image",
    ],
    "TwitterCreator": [
        "@pio_szczesniak",
    ],
    "TwitterSite": [
        "@Bumper_Ball",
    ],
};
