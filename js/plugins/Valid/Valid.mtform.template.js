/**
 * Default templates used for messages produces by different states of Validations
 * They can be modified, deleted or new templates can be added using Valid template
 * API.
 * @type {{message_success: string, message_error: string, message_info: string}}
 */
var MT_VALID_TMP = {
    message_success : "<div class='alert alert-success'></div>",
    message_error : "<div class='alert alert-danger'></div>",
    message_info : "<div class='alert alert-info'></div>"
}