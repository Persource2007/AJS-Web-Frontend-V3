const {
	ClassicEditor,
	Essentials,
	Bold,
	Italic,	
	Underline,
	Font,
	Paragraph,
	createDropdown,
	ButtonView,
    SelectView,
    addListToDropdown,
    Collection,
	Plugin,
    SourceEditing,
    Table,
    TableToolbar,
	TableProperties,
	TableCellProperties,
	TableColumnResize,
	List: ListPlugin,
	Alignment,
	PageBreak,
    HorizontalLine,
	Image,
    ImageToolbar,
    ImageStyle,
    ImageResize,
	ImageUpload,
	SimpleUploadAdapter,
} = CKEDITOR;

// Define a custom plugin for the dropdown
class CustomFieldsPlugin extends Plugin {
	constructor(editor) {
		super(editor); // Call the super constructor
		this.editor = editor;
	}

	init() {
		const editor = this.editor;

		const master_code = editor.config.get("customConfig.master_code");

		// Add the dropdown to the editor's toolbar
		editor.ui.componentFactory.add("customFields", (locale) => {        
			const dropdownView = createDropdown(locale);

			// Set up the dropdown button
			dropdownView.buttonView.set({
				label: "Fields",
				withText: true,
				tooltip: false,
			});
            dropdownView.class = 'ck-custom-dropdown';

			// Create the dropdown panel
			const panelView = dropdownView.panelView;

			// Define the dropdown items
			this.get_items(master_code).then((items) => {
				// Add the items to the dropdown
				items.forEach((item) => {
					const buttonView = new ButtonView(locale);

					// Set the button properties for the item
					buttonView.set({
						label: item.label, // Set the label
						withText: true, // Ensure text is shown
					});

					// Set up the click event
					buttonView.on("execute", () => {
						// Insert the selected item into the editor
						editor.model.change((writer) => {
							const insertPosition =
								editor.model.document.selection.getFirstPosition();
							writer.insertText(item.value, insertPosition);
						});
						// Close the dropdown after selecting an item
						dropdownView.isOpen = false;
					});

					// Add the button to the dropdown panel
					panelView.children.add(buttonView);
				});
			});

			dropdownView.on('change:isOpen', (evt, name, isOpen) => {
				if (isOpen && dropdownView.panelView.element) {
					dropdownView.panelView.element.style.maxHeight = '250px';
					dropdownView.panelView.element.style.overflowY = 'auto';
				}
			});

			return dropdownView;
		});
	}

	get_items(master_code) {
		let items = [
		];

        if(master_code == 'UPLIFT_REMINDER_FIELDS') {
            master_code = null;
            items = [
                { label: 'Client Code', value: '{$client_code}' },
                { label: 'Uplift Date', value: '{$uplift_date}' },
                { label: 'Uplift On', value: '{$uplift_on}' },
                { label: 'Uplift Percentage', value: '{$uplift_percentage}' },
            ];
        }

		if (master_code) {
			let url = site_url + "master-record/get_all";
			return ajaxWithRefresh({
				url: url,
				method: "GET",
				dataType: "json",
				data: {
					filters: { master_code },
				},
			})
				.then((response) => {
					const mapped = response?.message?.data.map((item) => ({
						label: item.master_value,
						value: "{$" + item.master_value_code + "}",
					})) ?? [];
					return mapped.sort((a, b) => a.label.localeCompare(b.label));
				})
				.catch((error) => {
					console.error("Error fetching dynamic data:", error);
					return items;
				});
		}

		return new Promise((resolve) => { 
            resolve(items);
        });
	}   
}

class TemplatePlugin extends Plugin {
	constructor(editor) {
		super(editor); // Call the super constructor
		this.editor = editor;
		this.dropdownView = null;
		this.panelView = null;
		this.locale = null;
		// Store reference globally so it can be accessed from other scripts
		window.templatePluginInstance = this;
	}

	static get pluginName() {
		return 'TemplatePlugin';
	}

	init() {
		const editor = this.editor;

		// Add the dropdown to the editor's toolbar
		editor.ui.componentFactory.add("customTemplates", (locale) => {        
			const dropdownView = createDropdown(locale);
			this.locale = locale;
			this.dropdownView = dropdownView;

			// Set up the dropdown button
			dropdownView.buttonView.set({
				label: "Templates",
				withText: true,
				tooltip: false,
			});

            dropdownView.class = 'ck-custom-dropdown';

			// Create the dropdown panel
			const panelView = dropdownView.panelView;
			this.panelView = panelView;

			// Define the dropdown items
			this.populateTemplates();

			return dropdownView;
		});
	}

	populateTemplates() {
		const editor = this.editor;
		const panelView = this.panelView;
		const locale = this.locale;

		// Safety check before clearing
		if (!panelView) {
			console.warn('TemplatePlugin: panelView not initialized yet');
			return;
		}

		// Clear existing items
		panelView.children.clear();

		// Fetch and populate templates
		this.get_templates().then((items) => {
			// Add the items to the dropdown
			items.forEach((item) => {
				const buttonView = new ButtonView(locale);

				// Set the button properties for the item
				buttonView.set({
					label: item.label, // Set the label
					withText: true, // Ensure text is shown
				});

				// Set up the click event
				buttonView.on("execute", () => {
					// Insert the selected item into the editor
					editor.model.change(() => {
                        editor.setData(item.value);
					});
					// Close the dropdown after selecting an item
					if (this.dropdownView) {
						this.dropdownView.isOpen = false;
					}
				});

				// Add the button to the dropdown panel
				panelView.children.add(buttonView);
			});
		}).catch((error) => {
			console.error('TemplatePlugin: Error populating templates', error);
		});
	}

	refreshTemplates() {
		if (this.panelView) {
			this.populateTemplates();
		} else {
			console.warn('TemplatePlugin: panelView not available for refresh');
		}
	}

	get_templates() {
        const editorParentElement = this.editor.sourceElement;
        // Retrieve the ID of the parent element
        const elementId = editorParentElement.id;
        const template_fn = $("#"+elementId).data('template-fn');

        // First, check for custom template function on the element
        if (template_fn && typeof window[template_fn] == "function") {
            return window[template_fn].call();
        }
        
        // Fallback: use default appointment template endpoint
        let url = site_url + "appointment-template/get_all";
        return ajaxWithRefresh({
            url: url,
            method: "GET",
            dataType: "json",
        }).then((response) => {
            return response?.data.map((item) => ({
                label: item.title,
                value: item.draft,
            }));
        })
        .catch((error) => {
            console.error("Error fetching dynamic data:", error);
            return [];
        });
    }   
}

// initilize ckeditor
function init_ckeditor(element, is_enable_template = false) {
	const master_code = $(element).data("master-code") ?? null;
	return ClassicEditor.create(document.querySelector(element), {
		plugins: [
			Essentials,
			Bold,
			Italic,
			Underline,			
			Font,
			Paragraph,
			ListPlugin,
            SourceEditing,
            Table,
            TableToolbar,
			TableProperties,
			TableCellProperties,
			TableColumnResize,
			Alignment,
			PageBreak,
            HorizontalLine,
			Image,
			ImageToolbar,
			ImageStyle,
			ImageResize,
			ImageUpload,
			SimpleUploadAdapter,
			CustomFieldsPlugin,
			TemplatePlugin,
		],
		toolbar: [
			"undo",
			"redo",
			"bold","italic","underline",
			"fontSize",
			"fontFamily",
			"fontColor",
			"fontBackgroundColor",
			"bulletedList",
			"numberedList",
            "insertTable",
            "sourceEditing",
			"alignment:left", "alignment:center", "alignment:right", "alignment:justify",
            "horizontalLine",
			"insertImage",
			"pageBreak",
			master_code ? "customFields" : '',
            '|',
            is_enable_template ? "customTemplates" : ''
		],
		table: {
			contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties' ],
			// Optional: allow resizing using mouse drag
			// The TableColumnResize plugin enables resizing but if you want exact % you still might edit source
		},
		alignment: {
			options: [ 'left', 'center', 'right', 'justify' ] // choose which options to show
		},
        fontFamily: {
            options: [
                'default',
                'Arial, Helvetica, sans-serif',
                'Calibri, Arial, Helvetica, sans-serif',   // Calibri
                'Courier New, Courier, monospace',
                'Georgia, serif',
                'Times New Roman, Times, serif',
                'Verdana, Geneva, sans-serif',
            ],
            supportAllValues: true
        },

        htmlSupport: {
            allow: [
                { name: 'hr', attributes: true, classes: true, styles: true },
                {
					name: /.*/,
					styles: {
						'font-family': true
					}
				}
            ]
        },
		simpleUpload: {
			uploadUrl: site_url + 'resources/uploads/ckeditor_image', // your backend API
			withCredentials: false
		},
		customConfig: {
			master_code,
		},
	})
		.then((editor) => {
			editor.model.document.on("change:data", () => {
				document.querySelector(element).value = editor.getData();
			});

			// safe wrapper for the alignment command(s)
			['alignment','alignment:left','alignment:center','alignment:right','alignment:justify'].forEach(cmdName => {
				try {
				const cmd = editor.commands.get(cmdName);
				if (cmd && typeof cmd.execute === 'function') {
					const orig = cmd.execute.bind(cmd);
					cmd.execute = function(opts){
					try {
						return orig(opts);
					} catch (err) {
						console.error('Alignment command error for', cmdName, err);
						console.log('Editor snapshot (first 400 chars):', (editor.getData()||'').slice(0,400));
						// swallow the error to avoid uncaught TypeError
						return;
					}
					};
				}
				} catch(e){ /* ignore wrapper errors */ }
			});

			return editor;
		})
		.catch((error) => {
			console.error(error);
		});
}
