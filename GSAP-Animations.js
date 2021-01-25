const tl = gsap.timeline({ defaults: { ease: "power1.out" } });

tl.to(".span-text", { y: '0%', duration: 1, stagger: .35, delay: .8 });
tl.to(".HeadingsTop", {x: '-100%', duration: 1, delay: 1})
tl.to(".HeadingsBottom", {x: '100%', duration: 1, delay: 0}, "-=1")