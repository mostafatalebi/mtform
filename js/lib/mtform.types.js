/**
 * An object holding all instances of form creation based on their type
 * @type {{input: Array, password: Array, file: Array, hidden: Array, radio: Array, checkbox: Array, input: Array, submit: Array, button: Array, textarea: Array, select: Array, custom: Array}}
 */
var MTF_Collection = {
    "input" : [],
    "password" : [],
    "file" : [],
    "hidden" : [],
    "radio" : [],
    "checkbox" : [],
    "input" : [],
    "submit" : [],
    "button" : [],
    "textarea" : [],
    "select" : [],
    "custom" : []
};

/**
 * HTML object which holds the before and after html of the next immediate component
 * @type {{after: string, before: string}}
 */
var MTF_HTML = {
    after : "",
    before : ""
};

/**
 * Placeholders which are used across components
 * @type {{rules: string, component: string, before: string, after: string, message: string, label: string, attrs: string, value: string, innerValue: string}}
 */
var MTF_PLACEHOLDERS = {
    rules : ":rules",
    component : ":component",
    before : ":before",
    after : ":after",
    message : ":message",
    label : ":label",
    attrs : ":attrs",
    value : ":value",
    innerValue : ":innerValue"
};

/**
 * A list of legal form components
 * @type {string[]}
 */
var MTF_COMPONENTS = [
    "input", "select", "textarea", "radio", "checkbox", "button", "submit",
];