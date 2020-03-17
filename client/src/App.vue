<template>
    <div id="app">
        <header>
            <h4>T1TLE</h4>
            <nav>
                <ul class="nav_link">
                    <li>
                        <router-link to="/login"
                            ><button class="btn">Login</button></router-link
                        >
                    </li>
                    <li>
                        <router-link to="/register"
                            ><button class="btn">Register</button></router-link
                        >
                    </li>
                    <li>
                        <button class="btn">Logout</button>
                    </li>
                </ul>
            </nav>
        </header>
        <router-view></router-view>
    </div>
</template>
