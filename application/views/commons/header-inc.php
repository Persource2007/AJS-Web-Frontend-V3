<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta content="" name="description" />
<meta content="" name="author" />
<!-- App favicon -->
<link rel="shortcut icon" href="<?= cnd_url('assets/images/ajs-favion.png'); ?>">
<!-- Sweet Alert css-->
<link href="<?= cnd_url('assets/libs/sweetalert2/sweetalert2.min.css'); ?>" rel="stylesheet" type="text/css" />
<!-- Layout config Js -->
<!--<script src="<?= cnd_url('assets/js/layout.js'); ?>"></script>-->
<!-- Bootstrap Css -->
<link href="<?= cnd_url('assets/css/bootstrap.min.css'); ?>" rel="stylesheet" type="text/css" />
<!-- Icons Css -->
<link href="<?= cnd_url('assets/css/icons.min.css'); ?>" rel="stylesheet" type="text/css" />
<!-- App Css-->
<link href="<?= cnd_url('assets/css/app.min.css?v=2.4'); ?>" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<link href="<?= cnd_url('assets/libs/glightbox/css/glightbox.min.css'); ?>" rel="stylesheet" type="text/css" /> 
<!-- custom Css-->
<link href="<?= cnd_url('assets/css/custom.min.css'); ?>" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="//code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css" />
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">
<link href="https://cdn.jsdelivr.net/npm/select2@4.0.5/dist/css/select2.min.css" rel="stylesheet" />
<link href="<?= cnd_url('assets/libs/dropzone/dropzone.css'); ?>" rel="stylesheet" type="text/css" />
<!--  END CSS SECTION -->
<!-- START JS SECTION -->
<script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
<script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>


<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
<script src="https://cdn.jsdelivr.net/npm/select2@4.0.5/dist/js/select2.full.js"></script>
<script src="<?= cnd_url('assets/js/jquery.inputmask.min.js'); ?>"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>

<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css" />
<link rel="stylesheet" href="<?= cnd_url('assets/css/materialdesignicons.min.css'); ?>" crossorigin="anonymous" referrerpolicy="no-referrer" />
<link rel="stylesheet" href="<?= cnd_url('assets/css/ckeditor5.css'); ?>" />
<script src="<?= cnd_url(); ?>assets/libs/simplebar/simplebar.min.js"></script>
<script type="text/javascript" src="<?= cnd_url('assets/js/app/hashids.js'); ?>"></script>
<script type="text/javascript">
    hashids = new Hashids('',10);
    site_url = '<?= api_url(); ?>';
    cdn_url = '<?= cdn_url(); ?>';
    s3_url = localStorage.getItem('s3_url') ? JSON.parse(localStorage.getItem('s3_url')) : '';
</script>
<script src="<?= cnd_url('assets/js/app/ajs.js?v=2.6'); ?>" rel="stylesheet" type="text/javascript" ></script>
<script>
    ajs.preload_settings();
    ajs.is_logged_in();

</script>
<script type="module">
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
    import { getMessaging, getToken} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging.js";

    const firebaseConfig = {
        apiKey: "AIzaSyDMRGcbz4AHQyNKVcKUXDLZ2KnK4Q55cTQ",
        authDomain: "ajs-project-f206b-integration.firebaseapp.com",
        projectId: "ajs-project-f206b-integration",
        messagingSenderId: "364370679822",
        appId: "1:364370679822:web:da02508ed0e322711ac45f"
    };

    // const firebaseConfig = {
    // apiKey: "AIzaSyCbrJT7rIOCIovfAxRUgvU6ehK331dhGqQ",
    // authDomain: "ajs-netlink.firebaseapp.com",
    // projectId: "ajs-netlink",
    // storageBucket: "ajs-netlink.firebasestorage.app",
    // messagingSenderId: "390259793163",
    // appId: "1:390259793163:web:3bdbf6394a4a34e9c9d60e"
    // };

    // Initialize Firebase in the main context
    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging(app);

    // Register the service worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register("<?= cnd_url('firebase-messaging-sw.js'); ?>")
            .then((registration) => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch((error) => {
                console.log('Service Worker registration failed:', error);
            });
    }

    // // Request notification permission and get FCM token
    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            getToken(messaging, {
                vapidKey: 'BC-OyBfddc0J1_H0rXV9yU3pdUR9i45rN5P6wKrGdRlIj4133wqYN-BKriSfS9SXT3_MKiGzGEzB0cTC2-sI3vY'
                //vapidKey: 'BB411C0g7UzTm_znrhLN1Os-8qvT99J3zHnpO9sm9DiXbVQiFGe82bS7X0g77gDl_XtsEj4PRW1MLlNsDuy72Q0'
            }).then((currentToken) => {
                if (currentToken) {
                    console.log("FCM Token:", currentToken);
                } else {
                    console.warn('No registration token available. Request permission to generate one.');
                }
            }).catch((error) => {
                console.warn('An error occurred while retrieving the FCM token:', error);
            });
        } else {
            console.warn("Notification permission not granted.");
        }
    });

</script>
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/signature_pad/1.5.3/signature_pad.min.js"></script>
<script src="<?= cnd_url('assets/js/forms/form-handler.js?v=1.3'); ?>" rel="stylesheet" type="text/javascript" ></script>
<script src="<?= cnd_url('assets/js/app/commons.js?v=1.1'); ?>" rel="stylesheet" type="text/javascript" ></script>
<script src="<?= cnd_url('assets/js/device-uuid.min.js'); ?>" rel="stylesheet" type="text/javascript" ></script>
<script src="<?= cnd_url('assets/js/app/interface.js?v=1.3'); ?>" rel="stylesheet" type="text/javascript" ></script>
<script src="<?= cnd_url('assets/js/app/property-alert-row.js'); ?>" rel="stylesheet" type="text/javascript" ></script>
<script src="<?= cnd_url(); ?>assets/libs/bootstrap/js/bootstrap.bundle.min.js"></script>
