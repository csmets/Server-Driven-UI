const kitchenSinkQuery = {
  kitchenSink: () => {
    return {
      // view elements
      elements: [
        {
          // container
          containerType: "FILL",
          elements: [
            // Typography
            {
              typographyVariant: "H1",
              value: "H1. Kitchen Sink",
              typographyTheme: "PRIMARY"
            },
            {
              typographyVariant: "H2",
              value: "H2. Typography",
              typographyTheme: "PRIMARY"
            },
            {
              typographyVariant: "H3",
              value: "H3. Heading",
              typographyTheme: "PRIMARY"
            },
            {
              typographyVariant: "H4",
              value: "H4. Heading",
              typographyTheme: "PRIMARY"
            },
            {
              typographyVariant: "H5",
              value: "H5. Heading",
              typographyTheme: "PRIMARY"
            },
            {
              typographyVariant: "H6",
              value: "H6. Heading",
              typographyTheme: "PRIMARY"
            },
            {
              typographyVariant: "SUBTITLE1",
              value: "SUBTITLE1. This is a subtitle",
              typographyTheme: "PRIMARY"
            },
            {
              typographyVariant: "SUBTITLE2",
              value: "SUBTITLE2. This is a smaller subtitle",
              typographyTheme: "PRIMARY"
            },
            {
              typographyVariant: "BODY1",
              value: "BODY1. This is a some body text.",
              typographyTheme: "PRIMARY"
            },
            {
              typographyVariant: "BODY1",
              value: "BODY1. This is a some smaller body text.",
              typographyTheme: "PRIMARY"
            },
            {
              typographyVariant: "CAPTION",
              value: "CAPTION. text.",
              typographyTheme: "PRIMARY"
            },
            {
              typographyVariant: "OVERLINE",
              value: "OVERLINE. text.",
              typographyTheme: "PRIMARY"
            },
            {
              typographyVariant: "H3",
              value: "Heading in secondary typographyTheme",
              typographyTheme: "SECONDARY"
            },
            {
              typographyVariant: "BODY1",
              value: "Theme can be applied to any typography item.",
              typographyTheme: "SECONDARY"
            }
          ]
        },
        {
          // container
          containerType: "FILL",
          elements: [
            // Spacing
            {
              typographyVariant: "H2",
              value: "Spacing",
              typographyTheme: "PRIMARY"
            },
            {
              _debugColor: null,
              width: 0,
              height: 60
            },
            {
              typographyVariant: "BODY1",
              value: "Use spacing between items. You can debug via adding a color.",
              typographyTheme: "PRIMARY"
            },
            {
              _debugColor: "PRIMARY",
              width: 20,
              height: 60
            },
            {
              typographyVariant: "BODY1",
              value: "See above! to visually see the spacing",
              typographyTheme: "PRIMARY"
            }
          ],
        },
        {
          //container
          containerType: "FILL",
          elements: [
            // Button
            {
              typographyVariant: "H2",
              value: "Buttons",
              typographyTheme: "PRIMARY"
            },
            {
              typographyVariant: "H5",
              value: "Basic button",
              typographyTheme: "PRIMARY"
            }
          ]
        },
        {
          containerType: "ROW",
          elements: [
            {
              buttonVariant: "TEXT",
              label: "Text",
              action: null,
              disabled: false,
              disableElevation: false,
              buttonTheme: "PRIMARY",
              buttonSize: "MEDIUM"
            },
            {
              buttonVariant: "CONTAINED",
              label: "Contained",
              action: null,
              disabled: false,
              disableElevation: false,
              buttonTheme: "PRIMARY",
              buttonSize: "MEDIUM"
            },
            {
              buttonVariant: "OUTLINED",
              label: "Outlined",
              action: null,
              disabled: false,
              disableElevation: false,
              buttonTheme: "PRIMARY",
              buttonSize: "MEDIUM"
            }
          ]
        },
        {
          containerType: "FILL",
          elements: [
            {
              typographyVariant: "H5",
              value: "Text button",
              typographyTheme: "PRIMARY"
            }
          ]
        },
        {
          containerType: "ROW",
          elements: [
            {
              buttonVariant: "TEXT",
              label: "Primary",
              action: null,
              disabled: false,
              disableElevation: false,
              buttonTheme: "PRIMARY",
              buttonSize: "MEDIUM"
            },
            {
              buttonVariant: "TEXT",
              label: "Disabled",
              action: null,
              disabled: true,
              disableElevation: false,
              buttonTheme: "PRIMARY",
              buttonSize: "MEDIUM"
            }
          ]
        }
      ]
    }
  }
}

module.exports = {
  kitchenSinkQuery
}
