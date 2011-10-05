# FieldChange (jQuery Plugin)

This jQuery plugin is a small plugin for performing periodic checks on form fields and invoking a callback function when there have been changes in the form state for this field.

This functionality might be useful in cases when the native Javascript events are either too frequent or do not cover all bases. The following are possible applications:

* Auto-complete
* AJAX verification of form field values
* Instant search

## Usage

You can use the FieldChange functionality as you would for a native event:

    $(element).fieldchange(handler);
    $(element).fieldchange({interval:2000}, handler);
    $(element).bind('fieldchange', handler);
    $(element).unbind('fieldchange', handler);

The following data can be passed for the event:

* **interval** - Milliseconds for polling. Default: 4000

## Demo

A demo page is included.
