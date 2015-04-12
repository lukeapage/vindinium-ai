module.exports = {
    options: {
        configuration: {
            "rules": {
                "align": [true,
                    "parameters",
                    "arguments",
                    "statements"],
                "ban": false,
                "class-name": true,
                "comment-format": [true,
                    "check-space",
                    "check-lowercase"
                ],
                "curly": true,
                "eofline": true,
                "forin": false,
                "indent": [true, 4],
                "interface-name": true,
                "jsdoc-format": true,
                "label-position": true,
                "label-undefined": true,
                "max-line-length": [true, 140],
                "member-ordering": [true,
                    "public-before-private",
                    "static-before-instance",
                    "variables-before-functions"
                ],
                "no-any": true,
                "no-arg": true,
                "no-bitwise": true,
                "no-console": [false],
                "no-construct": false,
                "no-constructor-vars": true,
                "no-debugger": true,
                "no-duplicate-key": true,
                "no-duplicate-variable": true,
                "no-empty": true,
                "no-eval": true,
                "no-string-literal": true,
                "no-switch-case-fall-through": true,
                "no-trailing-comma": false,
                "no-trailing-whitespace": true,
                "no-unused-expression": true,
                "no-unused-variable": true,
                "no-unreachable": true,
                "no-use-before-declare": true,
                "no-var-requires": true,
                "one-line": [false],
                "quotemark": [false],
                "radix": true,
                "semicolon": true,
                "switch-default": true,
                "triple-equals": [true, "allow-null-check"],
                "typedef": [true,
                    "call-signature",
                    "parameter",
                    "property-declaration",
                    "member-variable-declaration"
                ],
                "typedef-whitespace": [true, {
                    "call-signature": "space",
                    "index-signature": "space",
                    "parameter": "space",
                    "property-declaration": "space",
                    "variable-declaration": "space"
                }],
                "use-strict": [true,
                    "check-module"
                ],
                "variable-name": true,
                "whitespace": [true,
                    "check-branch",
                    "check-decl",
                    "check-operator",
                    "check-separator",
                    "check-type"
                ]
            }
        }
    },
    files: {
        src: ['src/**/*.ts']
    }
};