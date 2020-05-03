$(document).ready(function () {
    console.log("ready");

    let statusBtnParameter = 'opened';

    function replaceFilteredUser(user) {

        //INSERT AFTER BUDDY END
        let content = '<div class="buddy" style="display: block"><div class="avatar">'

        let photos = ''

        let card = '<div class="name">' + user.firstname + ' ' + user.age + ' ans<div class="iconcard seeProfil"><img src="/Images/Icon/eye.png" alt="" /></div><div id="report" class="iconcard"><img src="/Images/Icon/alert.png" alt="" /></div></div><div class="description"> ' + user.description + ' ...</div><div class="meat">'
        //FAVORITE DISH ? 

        //INSERT AFTER MOREINFOUSER
        //USER DETAILS

    }



    $(document).on('click', '.seeProfil', function () {
        let id = $(this).data("targetid")
        console.log($(".moreinfoUser").find(".containerUserDetails[data-userID=" + id + "]"))
        $(".moreinfoUser").find("div[data-userID=" + id + "]").attr("data-hidden", "false")
    })





    $("#closeBtn").click(function () {
        if (statusBtnParameter === 'opened') {
            $(".animationParameters").css('transform', 'translate(-420px,0)');
            statusBtnParameter = 'closed';

        } else {
            $(".animationParameters").css('transform', 'translate(-120px,0)');
            statusBtnParameter = 'opened';
        }
    });
    //AFFICHER LES DIFFERENTES RELATIONS
    $('[data-toggle="popover"]').popover({ trigger: 'hover' });

    $("#showMoreSex").click(function () {
        if (document.getElementById("boxSelectModifiedSex").style.height === "auto") {
            $("#boxSelectModifiedSex").css('height', '75px');
            $("#boxSelectModifiedDiet").show();
            $("#showMoreDiet").show();
            $("#boxSelectModifiedCat").show();
            $("#showMoreCat").show();
            $("#boxSelectAge").css({ height: 'auto', opacity: '100' });
            $("#boxSelectDistance").css({ height: 'auto', opacity: '100' });
            $(this).html('<i style=\'font-size:18px;color:white\' class=\'fas\'>&#xf103;</i>');
        } else {
            $("#boxSelectModifiedSex").css('height', 'auto');
            $("#boxSelectModifiedDiet").hide();
            $("#showMoreDiet").hide();
            $("#boxSelectModifiedCat").hide();
            $("#showMoreCat").hide();
            $("#boxSelectAge").css({ height: '0', opacity: '0' });
            $("#boxSelectDistance").css({ height: '0', opacity: '0' });
            $(this).html('<i style=\'font-size:18px;color:white\' class=\'fas\'>&#xf102;</i>');
        }
    });
    $("#showMoreDiet").click(function () {
        if (document.getElementById("boxSelectModifiedDiet").style.height === "auto") {
            $("#boxSelectModifiedDiet").css('height', '75px');
            $("#boxSelectModifiedSex").show();
            $("#showMoreSex").show();
            $("#boxSelectModifiedCat").show();
            $("#showMoreCat").show();
            $("#boxSelectAge").css({ height: 'auto', opacity: '100' });
            $("#boxSelectDistance").css({ height: 'auto', opacity: '100' });
            $(this).html('<i style=\'font-size:18px;color:white\' class=\'fas\'>&#xf103;</i>');
        } else {
            $("#boxSelectModifiedDiet").css('height', 'auto');
            $("#boxSelectModifiedSex").hide();
            $("#showMoreSex").hide();
            $("#boxSelectModifiedCat").hide();
            $("#showMoreCat").hide();
            $("#boxSelectAge").css({ height: '0', opacity: '0', margin: 0 });
            $("#boxSelectDistance").css({ height: '0', opacity: '0', margin: 0 });
            $(this).html('<i style=\'font-size:18px;color:white\' class=\'fas\'>&#xf102;</i>');
        }
    });


    //ON RECUPERE LA RELATION SELECTIONNEE
    $('.selectRelationCase').click(function () {
        let selected = $(this).attr("data-selected")
        selected = selected == "true" ? "false" : "true"
        $(this).attr("data-selected", selected)
        let id = $(this).attr("id")

        $.post("/ajax.php?entity=user&action=updateInterestedRelation",
            {
                value: selected,
                id: id
            })
            .fail(function (e) {
                console.log("fail", e);
            })
            .done(function (e) {
                let data = JSON.parse(e);
                if (data.status === 'success') {
                    console.log(data);
                    $("#messageSuccess").html("Relation bien enregistrés !");
                    $('#containerMessageSuccess').show(200).delay(2000).hide(200);
                }
            });

    });


    ///////////////////////RECUPERATION DES DONNEES PARAMETRES////////////////////////

    //ON MOVE EVENT
    $('#distanceMax').on('input', function () {
        let value = $(this).val();
        $("#valueDistance").html(value)
    });
    $("#ageRangemin").on('input', function () {
        let value = $(this).val();
        $("#valueAgeMin").html(value)
    });
    $("#ageRangemin").mouseleave('input', function () {
        if ($(this).val() > $("#ageRangemax").val()) {
            $(this).val($("#ageRangemax").val());
            let value = $(this).val();
            $("#valueAgeMin").html(value);
        }
    });
    $("#ageRangemax").mouseleave('input', function () {
        if ($(this).val() < $("#ageRangemin").val()) {
            $(this).val($("#ageRangemin").val());
            let value = $(this).val();
            $("#valueAgeMax").html(value);
        }
    });

    $("#ageRangemax").on('input', function () {
        let value = $(this).val();
        $("#valueAgeMax").html(value)
    });


    let initialSelectedSex = Array()

    $('input[name="sex"]:checked').each(function () {
        initialSelectedSex.push($(this).attr('id'));
    });

    let changesSex = Array()

    $('input[name="sex"]').change(function () {
        let id = this.id
        let status = this.checked

        //FOUND
        if (jQuery.inArray(id, initialSelectedSex) !== -1) {
            if (!status) {
                changesSex.push({ id: id, status: false })
            } else {
                changesSex = $.grep(changesSex, function (e) {
                    return e.id != id;
                });
            }
        }
        //NOT FOUND
        else {
            if (status) {
                changesSex.push({ id: id, status: true })
            } else {
                changesSex = $.grep(changesSex, function (e) {
                    return e.id != id;
                });
            }
        }
    })

    let initialDistance = $("#distanceMax").val();
    let initialAgeMin = $("#ageRangemin").val();
    let initialAgeMax = $("#ageRangemax").val();

    $("#submitParameter").click(function () {

        let argsJSON = {
            valuesDiet: []
        };

        let newDistance = $("#distanceMax").val();
        let newAgeMin = $("#ageRangemin").val();
        let newAgeMax = $("#ageRangemax").val();

        if (newDistance != initialDistance) {
            argsJSON.distance = newDistance
        }
        if (newAgeMax != initialAgeMax) {
            argsJSON.ageMax = newAgeMax
        }
        if (newAgeMin != initialAgeMin) {
            argsJSON.ageMin = newAgeMin
        }

        $('input[name="diet"]').each(function () {
            let id = $(this).attr('id')
            let value = $(this).val()
            if (value != 1) {
                value = value == 0 ? false : true
                argsJSON.valuesDiet.push({ id: id, value: value })
            }
        })

        if (changesSex.length != 0) {

            argsJSON.changesSex = []
            for (var i = 0; i < changesSex.length; i++) {
                argsJSON.changesSex.push(changesSex[i]);
            }
        }

        $.post("/ajax.php?entity=user&action=editFilter", argsJSON)
            .fail(function (e) {
                console.log("fail", e)
            })
            .done(function (e) {
                let data = JSON.parse(e)
                if (data.status == 'success') {
                    $("#messageSuccess").html("Modification validée")
                    $('#containerMessageSuccess').show(200).delay(2000).hide(200)
                    location.reload();
                }

            })
    })

    //AFFICHER PROFILE
    $('.seeProfil').click(function () {
        $('.watchProfile').css({ opacity: '100%', 'pointer-events': 'all', 'transform': 'translate(0px,0)' });
        $('#blockButtons').css({ 'pointer-events': 'none' }).fadeOut('slow');
        $('.moveOpenProfil').css({ 'transform': 'translate(0px,0)' });
    });
    $('#closeProfileBtn').click(function () {
        $('.watchProfile').css({ opacity: '0%', 'pointer-events': 'none', 'transform': ' translate(-160px,0)' });
        $('#blockButtons').css({ 'pointer-events': 'all' }).fadeIn('slow');
        $('.moveOpenProfil').css({ 'transform': 'translate(150px,0)' });
        $('.moreinfoUser').find(".containerUserDetails").attr("data-hidden", "true")
    });
    // SWIPE

    $('#miamBtn').click(function () {
        $(this).css('pointer-events', 'none');
        $("#beurkBtn").css('pointer-events', 'none');
        let actualUser = $('.buddy:last');
        if (!actualUser.is(':first-child')) {

            //TODO AJAX
            let idLiked = actualUser.attr("id")

            actualUser.append('<div class="status miam">Miam!</div>');
            actualUser.addClass('rotate-left').delay(500);
            setTimeout(function () {
                $('.buddy:last').remove();
                $("#miamBtn").css('pointer-events', 'all');
                $("#beurkBtn").css('pointer-events', 'all');
            }, 1000);
        }
    });
    $('#beurkBtn').click(function () {

        $(this).css('pointer-events', 'none');
        $("#miamBtn").css('pointer-events', 'none');
        let actualUser = $('.buddy:last');
        if (!actualUser.is(':first-child')) {

            //TODO AJAX
            let idLiked = actualUser.attr("id")


            actualUser.append('<div class="status beurk">Beurk!</div>');
            actualUser.addClass('rotate-right').delay(500);
            setTimeout(function () {
                $('.buddy:last').remove();
                $("#beurkBtn").css('pointer-events', 'all');
                $("#miamBtn").css('pointer-events', 'all');

            }, 1000);
        }
    });

});

