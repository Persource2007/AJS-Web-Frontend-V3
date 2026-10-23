
        <nav class="navbar navbar-inverse fixed-top" id="sidebar-wrapper" role="navigation">
            <div class="heading-element">
                <h4 class="text-white p-3 pt-3 pb-3">Form Element</h4>
                <nav>
                    <div class="nav nav-tabs mb-0" id="nav-tab" role="tablist">
                        <a href="javascripe:void(0);" class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">JSON Fields</a>
                        <a href="javascripe:void(0);" class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Static Fields</a>
                    </div>
                </nav>
            </div>
            <div class="tab-content scrollbar" id="nav-tabContent">
                <div class="tab-pane active show force-overflow" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                    <ul class="nav nav-pills drag-item" id="fields_form">
                        <li class="nav-item">
                            <span draggable="true" class="btn btn-light d-flex" data-type="email">
                                <div class="field-icon">
                                    <img src="<?=base_url('assets/images/builder-icons/email.png');?>">
                                </div>
                                <div class="field-name">
                                    Email
                                </div>
                            </span>
                        </li>
                        <li class="nav-item">
                            <span draggable="true" class="btn btn-light d-flex" data-type="phone">
                                <div class="field-icon">
                                    <img src="<?=base_url('assets/images/builder-icons/call.png');?>">
                                </div>
                                <div class="field-name">
                                    Phone Number
                                </div>
                            </span>
                        </li>
                        <li class="nav-item">
                            <span draggable="true" class="btn btn-light d-flex" data-type="text">
                                <div class="field-icon">
                                    <img src="<?=base_url('assets/images/builder-icons/text-box.png');?>">
                                </div>
                                <div class="field-name">
                                    Single Text Box
                                </div>
                            </span>
                        </li>
                        <li class="nav-item">
                            <span draggable="true" class="btn btn-light d-flex" data-type="number">
                                <div class="field-icon">
                                    <img src="<?=base_url('assets/images/builder-icons/number.png');?>">
                                </div>
                                <div class="field-name">
                                    Number
                                </div>
                            </span>
                        </li>
                        <li class="nav-item">
                            <span draggable="true" class="btn btn-light d-flex" data-type="textarea">
                                <div class="field-icon">
                                    <img src="<?=base_url('assets/images/builder-icons/paragraph.png');?>">
                                </div>
                                <div class="field-name">
                                    Paragraph
                                </div>
                            </span>
                        </li>
                        <li class="nav-item">
                            <span draggable="true" class="btn btn-light d-flex" data-type="radio">
                                <div class="field-icon">
                                    <img src="<?=base_url('assets/images/builder-icons/radio.png');?>">
                                </div>
                                <div class="field-name">
                                    Radio Button
                                </div>
                            </span>
                        </li>
                        <li class="nav-item">
                            <span draggable="true" class="btn btn-light d-flex" data-type="checkbox">
                                <div class="field-icon">
                                    <img src="<?=base_url('assets/images/builder-icons/checkbox.png');?>">
                                </div>
                                <div class="field-name">
                                    Checkbox
                                </div>
                            </span>
                        </li>
                        <li class="nav-item">
                            <span draggable="true" class="btn btn-light d-flex" data-type="select">
                                <div class="field-icon">
                                    <img src="<?=base_url('assets/images/builder-icons/dropdown-arrow.png');?>">
                                </div>
                                <div class="field-name">
                                    Dropdown
                                </div>
                            </span>
                        </li>
                        <li class="nav-item">
                            <span draggable="true" class="btn btn-light d-flex" data-type="file">
                                <div class="field-icon">
                                    <img src="<?=base_url('assets/images/builder-icons/upload.png');?>">
                                </div>
                                <div class="field-name">
                                    File Upload
                                </div>
                            </span>
                        </li>
                        <li class="nav-item">
                            <span draggable="true" class="btn btn-light d-flex" data-type="file_caption">
                                <div class="field-icon">
                                    <img src="<?=base_url('assets/images/builder-icons/upload.png');?>">
                                </div>
                                <div class="field-name">
                                    File Upload With Caption
                                </div>
                            </span>
                        </li>
                        <li class="nav-item">
                            <span draggable="true" class="btn btn-light d-flex" data-type="date">
                                <div class="field-icon">
                                    <img src="<?=base_url('assets/images/builder-icons/calendar.png');?>">
                                </div>
                                <div class="field-name">
                                    Date
                                </div>
                            </span>
                        </li>
                        <li class="nav-item">
                            <span draggable="true" class="btn btn-light d-flex" data-type="time">
                                <div class="field-icon">
                                    <img src="<?=base_url('assets/images/builder-icons/time.png');?>">
                                </div>
                                <div class="field-name">
                                    Time
                                </div>
                            </span>
                        </li>
                        <li class="nav-item">
                            <span draggable="true" class="btn btn-light d-flex" data-type="datetime">
                                <div class="field-icon">
                                    <img src="<?=base_url('assets/images/builder-icons/timetable.png');?>">
                                </div>
                                <div class="field-name">
                                    Date Time
                                </div>
                            </span>
                        </li>
                        <li class="nav-item">
                            <span draggable="true" class="btn btn-light d-flex" data-type="signature">
                                <div class="field-icon">
                                    <img src="<?=base_url('assets/images/builder-icons/signature.png');?>">
                                </div>
                                <div class="field-name">
                                    Signature
                                </div>
                            </span>
                        </li>
                        <li class="nav-item">
                            <span draggable="true" class="btn btn-light d-flex" data-type="tabletemplate">
                                <div class="field-icon">
                                    <img src="<?=base_url('assets/images/builder-icons/table.png');?>">
                                </div>
                                <div class="field-name">
                                    Table Templates
                                </div>
                            </span>
                        </li>
                        <!-- <li class="nav-item">
                            <span draggable="true" class="btn btn-light d-flex" data-type="dtable">
                                <div class="field-icon">
                                    <img src="<?=base_url('assets/images/builder-icons/table.png');?>">
                                </div>
                                <div class="field-name">
                                    Table With Fields
                                </div>
                            </span>
                        </li> -->
                        <li class="nav-item">
                            <span draggable="true" class="btn btn-light d-flex" data-type="dbfield">
                                <div class="field-icon">
                                    <img src="<?=base_url('assets/images/builder-icons/database-field.png');?>">
                                </div>
                                <div class="field-name">
                                    Database Fields
                                </div>
                            </span>
                        </li>
                        <li class="nav-item">
                            <span draggable="true" class="btn btn-light d-flex" data-type="dheading">
                                <div class="field-icon">
                                    <img src="<?=base_url('assets/images/builder-icons/heading.png');?>">
                                </div>
                                <div class="field-name">
                                    Section Heading
                                </div>
                            </span>
                        </li>
                    </ul>
                </div>
                <div class="tab-pane" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                    <ul class="nav nav-pills drag-item" id="fields_form">
                        <li class="nav-item">
                            <span draggable="true" class="btn btn-light d-flex" data-type="logo">
                                <div class="field-icon">
                                    <img src="<?=base_url('assets/images/builder-icons/upload.png');?>">
                                </div>
                                <div class="field-name">
                                    Upload Logo
                                </div>
                            </span>
                        </li>
                        <li class="nav-item">
                            <span draggable="true" class="btn btn-light d-flex" data-type="title">
                                <div class="field-icon">
                                    <img src="<?=base_url('assets/images/builder-icons/heading.png');?>">
                                </div>
                                <div class="field-name">
                                    Title
                                </div>
                            </span>
                        </li>
                        <li class="nav-item">
                            <span draggable="true" class="btn btn-light d-flex" data-type="heading">
                                <div class="field-icon">
                                    <img src="<?=base_url('assets/images/builder-icons/heading.png');?>">
                                </div>
                                <div class="field-name">
                                    Heading
                                </div>
                            </span>
                        </li>
                        <li class="nav-item">
                            <span draggable="true" class="btn btn-light d-flex" data-type="description">
                                <div class="field-icon">
                                    <img src="<?=base_url('assets/images/builder-icons/paragraph.png');?>">
                                </div>
                                <div class="field-name">
                                    Description
                                </div>
                            </span>
                        </li>
                        <li class="nav-item">
                            <span draggable="true" class="btn btn-light d-flex" data-type="table">
                                <div class="field-icon">
                                    <img src="<?=base_url('assets/images/builder-icons/table.png');?>">
                                </div>
                                <div class="field-name">
                                    Table
                                </div>
                            </span>
                        </li>
                        <li class="nav-item">
                            <span draggable="true" class="btn btn-light d-flex" data-type="line">
                                <div class="field-icon">
                                    <img src="<?=base_url('assets/images/builder-icons/divider.png');?>">
                                </div>
                                <div class="field-name">
                                    Divider
                                </div>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>

        </nav>
