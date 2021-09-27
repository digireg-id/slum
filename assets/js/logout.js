function logout() {
    Swal.fire({
        title: "Are you sure?",
        text: "You want to logout",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, do it!"
    }).then(function(result) {
        if (result.value) {
            window.location.href = url + 'logout';
        }
    });
}