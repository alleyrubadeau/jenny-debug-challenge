"use strict";$(document).ready(function() {  //when page loads, do:  console.log("page is loaded!");  $(".popbox:first").slideDown(750);  $(".reload").hide();  $(".reload").fadeIn(20000);  //user interactions:  $(".title").on("mouseover", function () {    $(this).addClass("highlight");  });  $(".title").on("click", function () {    console.log("title has been clicked");    var popbox = $(this).siblings(".popbox");    popbox.slideToggle(500);    popbox.focus();  });  $(".title").on("mouseout", function () {    $(this).removeClass("highlight");  });  $("#Current").on("click", "h3", function(){    $(this).text("Current Endeavors")  });  $("#Summary").on("click", "h3", function(){    $(this).text("Summary")  });  //reload the SeaIce image, use new attribute to get around caching  $(".reload").on('click', function() {    $("#SeaIce").attr("src", $("#SeaIce").attr("src") + "?" + Math.random())  });  $(".reload").on("mouseover", function () {    $(this).css("color", "white");  });  $(".reload").on("mouseout", function () {    $(this).css("color", "#95d5f0");  });});