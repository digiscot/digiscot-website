$(document).ready(function () {
    setServiceUrl(domain);
    configureForm();
});

function setServiceUrl(domain) {
    var action = $("#ChallengeFundForm").attr("action");
    var url = domain + action;
    console.log("Service URL: ", url);
    $("#ChallengeFundForm").attr("action", url);
}

var submitType = '';
var domain = '';

function configureForm() {

    var options = {
        beforeSubmit: function (obj, more, a) {
            //console.log(b);
            $(".required-field").removeClass("required-field");
            $('#ProcessingPanel').show();
        },
        success: function (response) {
            if (response === "") {
                //console.log(submitType);
                if (submitType == 'previous') OnPreviousCall();
                else if (submitType == 'save') OnOkCall();
                else if (submitType === 'next') OnSuccessCall();
            } else {
                OnErrorCall('Problems reported while saving your data:  ' + response);
            }
            $('#ProcessingPanel').hide();
        },
        error: function (response) {
            OnErrorCall('Technical error');
            $('#ProcessingPanel').hide();
        },
        url: this.action,
        type: this.method
    };

    // bind to the form's submit event
    $('#ChallengeFundForm').submit(function (obj, a) {
        // inside event callbacks 'this' is the DOM element so we first
        // wrap it in a jQuery object and then invoke ajaxSubmit
        $(this).ajaxSubmit(options);        
        return false; //prevent standard browser submit and page navigation
    });

    $('#btnPrevious').click(function (obj, a) {
        submitType = 'previous';
    });

    $('#btnSave').click(function (obj, a) {
        submitType = 'save';
    });

    $('#btnNext').click(function (obj, a) {
        submitType = 'next';
    });
}

function authenticate() {
    var key = getCookie("ChallengeFundApplicationKey");
    if (!key) key = get("key"); //if no cookie found, then try to get the key from the URL request variable

    $.ajax({
        type: 'GET',
        dataType: "json",
        url: '/ChallengeFund/Get?key=' + key,
        success: function (data) {
            createCookie("ChallengeFundApplicationKey", data.AuthenticationKey, 60);
            
            console.log(data);

            for (key in data) {
                
                $("#" + key).val(data[key]); //inputboxes, textareas & comboboxes
                $('#cb' + key).prop('checked', data[key]); //checkboxes

                $('#cb' + key).trigger("change");

                if (key === "Items") {
                    var items = data[key];
                    for (var i = 0; i < items.length; i++) {
                        var item = items[i];
                        addRowToTable('#' + item.Type + 'Table', '#Default' + item.Type + 'Row', item);
                    }
                }
            }
            loadData(data);
        },
        error: function (data) {
            console.log("ERROR", data);
        }
    });
}

function appendCheckBoxesToObject(objPrefix, arr) {
    for (var i = 0; i < arr.length; i++) {
        var row = "<div class='checkbox col-md-3 col-xs-6' style='margin-top:4px;'><label class='col'>";
        row += "<input name='" + objPrefix + "[]' id='" + objPrefix + i + "' type='checkbox' value='" + arr[i] + "'";

        if (arr[i].toLowerCase() === "other, please specify") {
            row += " onchange='otherOptionChanged(this, $(\"#" + objPrefix + "CommentRow\"));'";
        }
        row += ">" + arr[i];
        row += "</label></div>";
        $("#" + objPrefix + "Row").append(row + "\n");
    }
}

function appendOptionValuesToDropDown(dropDownId, arr) {
    for (var i = 0; i < arr.length; i++) {
        var row = "<option value=\"" + arr[i] + "\">" + arr[i] + "</option>";
        $("#" + dropDownId).append(row + "\n");
    }
}

function addRowToTable(tableId, defaultRowId, itemData, maxRows) {

    if (maxRows > 0) {
        maxRows += 2; //first row & totals are already there as well
        var rowCount = $(tableId + ' tr').length;
        if (rowCount >= maxRows) return;
    }
    
    var templateRow = $(defaultRowId).html();
    if (templateRow) {
        var id = makeId();
        var htmlRow = templateRow.replace(/XXX/g, id);

        if (!itemData) { //default values:
            itemData = {
                Month: '',
                Description: '',
                Amount: '',
                Number: ''
            };
        }

        htmlRow = htmlRow.replace("@Description", (itemData.Description) ? (itemData.Description) : '' );
        htmlRow = htmlRow.replace("@Amount", (itemData.Amount) ? (itemData.Amount) : '' );
        htmlRow = htmlRow.replace("@Number", (itemData.Number) ? (itemData.Number) : '');
        htmlRow = htmlRow.replace('"' + itemData.Month + '"', '"' + itemData.Month + '" selected');

        var deleteRowCell = "<td><input type='button' class='delete-row' onClick='removeRowFromTable(\"" +
                                tableId + "\",\"" + id + "\");' " + "value='X'></td>";

        $(tableId + " tr:last").before("<tr id='" + id + "'>" + htmlRow + deleteRowCell + "</tr>");
    }

    markTableRows(tableId);
    if (typeof (callback) == "calculateTotals") calculateTotals();
}

function removeRowFromTable(tableId, id) {
    $('table' + tableId + ' tr#' + id).remove();
    //console.log(id);
    markTableRows(tableId);
    calculateTotals();
}

function markTableRows(tableId) {
    //console.log(tableId);
    $(tableId + ' > tbody  > tr').each(function (i, tr) {
        var countCell = $("td", tr).first();
        $(countCell).html(i + 1);
        return i;
    });
}

function getTotalsForClass(className) {
    var sum = 0;
    var i = 0;
    $('.' + className).each(function () {
        if (i > 0) { //leave out the template (first one, so i == 0)
            var value = parseFloat($(this).val());
            if (value > 0 || value < 0) {
                sum += value;
            }
        }
        i++;
    });
    return sum;
}

function cbChanged(checkbox, prefixOfControlToToggle) {
    //console.log($("#" + prefixOfControlToToggle + "Label"));
    $(checkbox).next().val(checkbox.checked); //mark the hidden input value to be sent with the form
    if (prefixOfControlToToggle) { //if we want to make some more controls visible/hidden
        if (checkbox.checked) {
            $("#" + prefixOfControlToToggle + "Label").show();
            $("#" + prefixOfControlToToggle + "Layer").show();
        } else {
            $("#" + prefixOfControlToToggle + "Label").hide();
            $("#" + prefixOfControlToToggle + "Layer").hide();
        }
    }
}

function ensureTableHasOneEmptyRow(tablePrefix, maxRows) {
    var rowCount = document.getElementById(tablePrefix + "Table").getElementsByTagName("tr").length;
    if (rowCount <= 2) {
        addRowToTable('#' + tablePrefix + 'Table', '#Default' + tablePrefix + 'Row', maxRows);
    }
}

function isInteger(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

function isDecimal(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46)
        return false;

    return true;
}
