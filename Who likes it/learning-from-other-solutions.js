function likes(names) {
    const answerArr = [
        'no one likes this',
        `${names[0]} likes this`,
        `${names[0]} and ${names[1]} like this`,
        `${names[0]}, ${names[1]} and ${names[2]} like this`,
        `${names[0]}, ${names[1]} and ${names.length - 2} others like this`,
    ];
  
  return answerArr[Math.min(names.length, 4)]
}