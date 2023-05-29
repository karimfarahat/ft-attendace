model = {
  attendance: [
    {
      name: "Slappy the Frog",
      days: [
        true,
        true,
        true,
        true,
        false,
        true,
        false,
        false,

        false,
        false,
        false,
        false,
      ],
    },
    {
      name: "Lilly the Lizard",
      days: [
        true,
        false,
        true,
        false,
        true,
        true,
        true,
        false,
        false,
        false,
        true,
        true,
      ],
    },

    {
      name: "Paulrus the Walrus",
      days: [
        false,
        false,
        true,
        false,
        false,
        true,
        false,
        false,
        false,
        true,
        false,
        false,
      ],
    },
    {
      name: "Gregory the Goat",
      days: [
        true,
        false,
        true,
        true,
        true,
        false,
        false,

        true,
        false,
        false,
        false,
        false,
      ],
    },
    {
      name: "Adam the Anaconda",
      days: [
        true,
        false,
        true,
        false,
        false,
        false,
        true,
        false,
        false,
        false,
        false,
        false,
      ],
    },
  ],
};
(view = {
  clearView: function () {},
  tableRender: function () {
    this.clearView();
    var nameColumns = $("tbody .name-col");
    var attendance = JSON.parse(localStorage.getItem("attendance"));
    for (let i = 0; i < nameColumns.length; i++) {
      nameColumns[i].innerText = attendance[i].name;
    }
  },
  checkboxRender: function () {
    var attendance = JSON.parse(localStorage.getItem("attendance"));
    // $.each(attendance, function () {
    for (let i = 0; i < attendance.length; i++) {
      var studentRow = $(
        'tbody .name-col:contains("' + attendance[i].name + '")'
      ).parent("tr");

      for (let k = 0; k < attendance[i].days.length; k++) {
        dayChecks = $(studentRow).children(".attend-col").children("input");
        $(dayChecks[k]).on("click", function () {
          controller.checkboxChecker(i, k, this.checked);
        });
        $(dayChecks[k]).prop("checked", attendance[i].days[k]);
      }
    }
  },
  missedRender: function () {
    var attendance = JSON.parse(localStorage.getItem("attendance"));
    $allMissed = $("tbody .missed-col");
    for (let i = 0; i < attendance.length; i++) {
      var studentRow = $(
        'tbody .name-col:contains("' + attendance[i].name + '")'
      ).parent("tr");
      counter = 0;

      for (let k = 0; k < attendance[i].days.length; k++) {
        dayChecks = $(studentRow).children(".attend-col").children("input");
        if (!$(dayChecks[k]).prop("checked")) {
          //   console.log($(dayChecks[k]).prop("checked"));
          counter++;
        }
      }
      $($allMissed[i]).text(counter);
    }
  },
}),
  (controller = {
    init: function () {
      if (!localStorage.attendance) {
        localStorage.setItem("attendance", JSON.stringify(model.attendance));
        view.tableRender();
        view.checkboxRender();
        view.missedRender();
      } else {
        view.tableRender();
        view.checkboxRender();
        view.missedRender();
      }
    },
    // Count a student's missed days
    checkboxChecker: function (i, k, checked) {
      var attendance = JSON.parse(localStorage.getItem("attendance"));

      attendance[i].days[k] = checked;
      localStorage.setItem("attendance", JSON.stringify(attendance));
      view.missedRender();
    },
  });

controller.init();
